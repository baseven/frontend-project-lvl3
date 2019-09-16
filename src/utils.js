import { isURL } from 'validator';
import axios from 'axios';
import _ from 'lodash';
import parser from './parser';

const isUrlValidity = url => !url || isURL(url);

const isDuplicateValidity = (url, feedsList) => {
  const links = feedsList.map(obj => Object.keys(obj)).flat();
  if (links.includes(url)) {
    return false;
  }
  return true;
};

// const corsOrigin = 'https://crossorigin.me/'; не работает
const corsHeroku = 'https://cors-anywhere.herokuapp.com/';
const getXmlData = url => axios.get(`${corsHeroku}${url}`).then(response => response.data);
const getFeedAttributes = url => getXmlData(url).then(data => parser(data));

const updateLink = (link, feedsList) => {
  const currentFeed = feedsList.find(feed => _.has(feed, link));
  const currentAttributes = currentFeed[link];
  const currentPosts = currentAttributes.posts;
  const currentPostsLinks = currentPosts.map(({ postLink }) => postLink);

  getFeedAttributes(link).then((receivedAttributes) => {
    const receivedPosts = receivedAttributes.posts;
    const postsForAdding = receivedPosts
      .filter(({ postLink }) => !currentPostsLinks.includes(postLink));

    if (!postsForAdding.length) {
      return;
    }
    const updatedPosts = postsForAdding.concat(currentPosts);
    currentFeed[link].posts = updatedPosts;
  });
};

const updateFeedsList = (feedsList) => {
  const links = feedsList.map(feed => Object.keys(feed)).flat();
  links.forEach(link => updateLink(link, feedsList));
};

export {
  isUrlValidity,
  isDuplicateValidity,
  getFeedAttributes,
  updateFeedsList,
};
