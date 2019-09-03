import { watch } from 'melanke-watchjs';
import getRender from './renders';
import parser from './parser';
import { isValidity, getData } from './utils';

// pocess: 'initialization', 'validation', 'processing', 'publication', 'error reporting'
export default (element) => {
  const state = {
    input: {
      url: '',
      urlValidity: true,
      clientSideValidity: true, // отображается только после нажатия button
    },
    newsFeedLinks: [],
    newsFeedList: {},
    state4: false,
  };

  // необходимо доваить элемент для clientSideValidity
  const inputElement = element.querySelector('#input');
  const buttonElement = element.querySelector('#button-addon2');
  const newsFeedListElement = element.querySelector('#newsFeedList');
  const clientSideValidityElement = element.querySelector('#feedback');

  // наблюдение за state
  watch(state, 'input', () => {
    const render = getRender('input');
    render(state.input, inputElement);
  });

  watch(state, 'clientSideValidity', () => {
    const render = getRender('clientSideValidity');
    render(state.input.clientSideValidity, clientSideValidityElement);
  });

  watch(state, 'newsFeedList', () => {
    const render = getRender('newsFeedList');
    render(state.input.url, newsFeedListElement);
  });

  // обработчики событий
  const inputHandle = (event) => {
    /**
     * Перед проверкой url происходит переключение clientSideValidity на true
     * Осуществляем проверку переданного url на валидность.
     * Если url не проходит проверку, то изменяем state,
     * переключая urlValidity в false.
     * Это изменение state приводит к вызову render, который отслеживает input.
     * В противном случае ничего не происходит.
     */
    state.input.clientSideValidity = true;
    state.input.url = event.target.value;
    state.input.urlValidity = isValidity(state.input.url, state.newsFeedLinks);
  };

  const buttonHandle = () => {
    /**
     * Если текущее состояние urlValidity false,
     * то изменяем состояние state, переключая clientSideValidity на false,
     * что приводит к вызову renderError и выводится сообщение об ошибке.
     * -
     * В противном случае парсим данные по ссылке state.input.url.
     * Операция parser(state.input.url) асинхронная!
     * Если данные соответствуют <здесь проверка> проверке на валидность,
     * то изменяем state, добавляя в newsFeedLinks и newsFeedList новые значения.
     * Это изменение state приводит к вызову renderFeedsList, который отображает newsFeedList.
     * Далее (после выполнения асинхронной операции parser(state.input.url)) текстовое поле input
     * очищается и система переходит в первоначальное состояние, но с обновленным newsFeedList.
     * Начальное состояние также подразумевает, что state.input.url = null clientSideValidity = true
     */
    if (!state.input.urlValidity) {
      state.input.clientSideValidity = false;
    } else {
      // { newsFeed: [article1, article2, ..., arcticleN] }
      const data = getData(state.input.url);
      const newsFeed = parser(data);
      state.newsFeedLinks.push(Object.keys(newsFeed)[0]);
      state.newsFeedList.push(newsFeed);
      state.input.url = '';
    }
  };

  inputElement.addEventListener('input', inputHandle);
  buttonElement.addEventListener('click', buttonHandle);
};
