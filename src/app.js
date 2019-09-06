import { watch } from 'melanke-watchjs';
import getRender from './renders';
import parser from './parser';
import { isValidity, getFeedData } from './utils';

// pocess: 'initialization', 'validation', 'processing', 'publication', 'error reporting'
export default (element) => {
  const state = {
    url: '',
    urlValidity: true,
    dataValidity: true, // отображается только после нажатия button clientSideValidity
    newsFeedList: [],
    state4: false,
  };

  // необходимо добавить элемент для clientSideValidity
  const inputElement = element.querySelector('#input');
  const buttonElement = element.querySelector('#button-addon2');
  const newsFeedListElement = element.querySelector('#newsFeedList');
  const dataValidityElement = element.querySelector('#dataError');

  // наблюдение за state
  watch(state, 'url', () => {
    const render = getRender('input');
    render(state.url, state.urlValidity, inputElement);
  });

  watch(state, 'dataValidity', () => {
    const render = getRender('dataValidity');
    render(state.dataValidity, dataValidityElement);
  });

  watch(state, 'newsFeedList', () => {
    const render = getRender('newsFeedList');
    // const newsFeed = st
    render(state.url, state.newsFeedList, newsFeedListElement);
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
    // state.input.clientSideValidity = true;
    state.url = event.target.value;
    state.urlValidity = isValidity(state.url, state.newsFeedList);
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
    state.urlValidity = isValidity(state.url, state.newsFeedList);
    console.log(state.urlValidity);
    if (!state.urlValidity) {
      state.dataValidity = false;
    } else {
      // { newsFeed: [article1, article2, ..., arcticleN] }
      console.log(state.dataValidity);
      state.dataValidity = true;
      getFeedData(state.url)
        .then((data) => {
          console.log('yeap');
          console.log(data);
          const parse = parser(data);
          console.log('parse:');
          console.log(parse);
          const newsFeed = {};
          newsFeed[state.url] = parse;
          // state.newsFeedList.push(newsFeed);
          console.log('newsFeed:');
          console.log(newsFeed);
          state.newsFeedList.push(newsFeed);
        });
      // state.input.url = ''; возможно, стоит использовать placeholdre для очистки
    }
  };

  inputElement.addEventListener('input', inputHandle);
  buttonElement.addEventListener('click', buttonHandle);
};

/**
 * getData(state.input.url)
        .then((data) => {
          console.log('after then');
          console.log(data);
          const newsFeed = parser(data);
          state.newsFeedLinks.push(Object.keys(newsFeed)[0]);
          state.newsFeedList.push(newsFeed);
          console.log(state.newsFeedList);
        });
 */
