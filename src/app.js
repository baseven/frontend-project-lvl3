import { watch } from 'melanke-watchjs';
import getRender from './renders';

import { isUrlValidity, isDuplicateValidity, getFeedAttributes } from './utils';

export default (element) => {
  const state = {
    url: '',
    validity: {
      url: true,
      duplicate: true,
      data: true,
    },
    errorMessage: '',
    feedList: [],
  };

  const inputElement = element.querySelector('#input');
  const buttonElement = element.querySelector('#button-addon2');
  const errorMessageElement = element.querySelector('#errorMessage');
  const feedListElement = element.querySelector('#feedList');

  watch(state, 'url', () => {
    const render = getRender('inputBorder');
    render(state.url, state.validity, inputElement);
  });

  watch(state, 'errorMessage', () => {
    const inputBorderRender = getRender('inputBorder');
    inputBorderRender(state.url, state.validity, inputElement);

    const errorMessageRender = getRender('errorMessage');
    errorMessageElement.textContent = state.errorMessage;
    errorMessageRender(state.errorMessage, errorMessageElement);
  });

  watch(state, 'feedList', () => {
    const render = getRender('feedList');
    render(state.url, state.feedList, feedListElement);
  });

  const inputHandle = (event) => {
    state.validity.data = true;
    state.errorMessage = '';
    state.url = event.target.value;
    console.log('state.url:');
    console.log(state.url);
    state.validity.url = isUrlValidity(state.url);
    console.log('state.validity.url:');
    console.log(state.validity.url);
    state.validity.duplicate = isDuplicateValidity(state.url, state.feedList);
    console.log('state.validity.duplicate:');
    console.log(state.validity.duplicate);
    console.log('---------');
  };

  const buttonHandle = () => {
    if (!state.validity.url) {
      state.errorMessage = 'The URL is not correct';
      return;
    }
    if (!state.validity.duplicate) {
      state.errorMessage = 'The URL is already in use';
      return;
    }

    getFeedAttributes(state.url)
      .then((feedAttributes) => {
        console.log('feedAttributes:');
        console.log(feedAttributes);
        console.log('______');
        const feed = {};
        feed[state.url] = feedAttributes;
        state.feedList.push(feed);
        state.errorMessage = '';
      })
      .catch((e) => {
        state.validity.data = false;
        if (!e.response) {
          state.errorMessage = 'The data type does not match text/xml';
        }
        const { status, statusText } = e.response;
        state.errorMessage = `${status} error: ${statusText}`;
      });
  };

  inputElement.addEventListener('input', inputHandle);
  buttonElement.addEventListener('click', buttonHandle);
};
/**
 * RSS links:
 * https://rss.nytimes.com/services/xml/rss/nyt/Health.xml
 * http://feeds.bbci.co.uk/sport/football/rss.xml?edition=uk
 * https://rss.nytimes.com/services/xml/rss/nyt/Science.xml
 */
