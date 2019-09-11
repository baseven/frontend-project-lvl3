import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import getRender from './renders';
import {
  isUrlValidity,
  isDuplicateValidity,
  getFeedAttributes,
  updateFeedsList,
} from './utils';

export default (element) => {
  const state = {
    url: '',
    linkValidity: {
      url: true,
      duplicate: true,
    },
    dataValidity: false,
    errorMessage: '',
    feedsList: [],
    modalPost: {
      postTitle: '',
      postDescription: '',
    },
  };

  const inputElement = element.querySelector('#input');
  const buttonElement = element.querySelector('#button-addon2');
  const errorMessageElement = element.querySelector('#errorMessage');
  const feedsListElement = element.querySelector('#feedsList');
  const modalPostElement = $('#modalPost');

  watch(state, 'url', () => {
    const render = getRender('inputBorder');
    render(state.url, state.linkValidity, inputElement);
  });

  watch(state, 'dataValidity', () => {
    const render = getRender('inputValue');
    render(state.dataValidity, inputElement);
  });

  watch(state, 'errorMessage', () => {
    const inputBorderRender = getRender('inputBorder');
    inputBorderRender(state.url, state.linkValidity, inputElement);

    const errorMessageRender = getRender('errorMessage');
    errorMessageRender(state.errorMessage, errorMessageElement);
  });

  watch(state, 'feedsList', () => {
    const render = getRender('feedsList');
    render(state.feedsList, feedsListElement);
  });

  watch(state, 'modalPost', () => {
    const render = getRender('modalPost');
    render(state.modalPost, modalPostElement);
  });

  const inputHandle = (event) => {
    state.dataValidity = false;
    state.errorMessage = '';
    state.url = event.target.value;

    state.linkValidity.url = isUrlValidity(state.url);
    state.linkValidity.duplicate = isDuplicateValidity(state.url, state.feedsList);
  };

  const buttonHandle = () => {
    if (!state.linkValidity.url) {
      state.errorMessage = 'The URL is not correct';
      return;
    }
    if (!state.linkValidity.duplicate) {
      state.errorMessage = 'The URL is already in use';
      return;
    }

    getFeedAttributes(state.url)
      .then((feedAttributes) => {
        const feed = {};
        feed[state.url] = feedAttributes;
        state.feedsList.unshift(feed);

        state.dataValidity = true;
        state.errorMessage = '';
      })
      .catch((e) => {
        state.linkValidity.url = false;
        if (!e.response) {
          state.errorMessage = 'The data type does not match text/xml';
        }
        const { status, statusText } = e.response;
        state.errorMessage = `${status} error: ${statusText}`;
      });
  };

  modalPostElement.on('show.bs.modal', (event) => {
    const button = $(event.relatedTarget);
    const postTitle = button.data('title');
    const postDescription = button.data('description');

    state.modalPost = { postTitle, postDescription };
  });

  setInterval(() => updateFeedsList(state.feedsList), 5000);

  inputElement.addEventListener('input', inputHandle);
  buttonElement.addEventListener('click', buttonHandle);
};
/**
 * RSS links:
 * https://rss.nytimes.com/services/xml/rss/nyt/Health.xml
 * http://feeds.bbci.co.uk/sport/football/rss.xml?edition=uk
 * https://rss.nytimes.com/services/xml/rss/nyt/Science.xml
 */
