import { isURL } from 'validator';
import axios from 'axios';
import parser from './parser';

const isUrlValidity = url => !url || isURL(url);

const isDuplicateValidity = (url, newsFeedList) => {
  const links = newsFeedList.map(obj => Object.keys(obj)).flat();
  if (links.includes(url)) {
    return false;
  }
  return true;
};

const getPostAttributes = (post) => {
  const attributes = post.children;
  const postTitle = attributes[0].textContent;
  const postDescription = attributes[1].textContent;
  const postLink = attributes[2].textContent;

  return { postTitle, postDescription, postLink };
};

const makePostsList = (elements) => {
  const posts = elements.map(element => getPostAttributes(element));
  return posts;
};

const formFeedAttributes = (data) => {
  const doc = parser(data);

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const itemElements = doc.querySelectorAll('item');

  const items = [...itemElements];
  const posts = makePostsList(items);

  return { title, description, posts };
};

// const corsOrigin = 'https://crossorigin.me/'; не работает
const corsHeroku = 'https://cors-anywhere.herokuapp.com/';

const getXmlData = url => axios.get(`${corsHeroku}${url}`).then(response => response.data);

const getFeedAttributes = url => getXmlData(url).then(data => formFeedAttributes(data));

export {
  isUrlValidity,
  isDuplicateValidity,
  getFeedAttributes,
};
