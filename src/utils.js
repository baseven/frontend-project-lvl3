import { isURL } from 'validator';
import axios from 'axios';

/**
 * Валидация дублей:
 * Если url уже входит в состав links, то вернуть false
 * Валидация URL
 * Если url пустой или проходит проверку isURL, то вернуть true
 */
const isValidity = (url, links) => {
  if (links.include(url)) {
    return false;
  }
  return !url || isURL(url);
};

/**
 * https://corsproxy.github.io/
 * For example, if you wanted to grab the Google homepage, your code would request
 * https://crossorigin.me/https://google.com
 */
const getData = (url) => {
  const corsUrl = `https://crossorigin.me/${url}`;
  const data = axios.get(corsUrl)
    .then(response => response)
    .catch(error => error);

  return data;
};

export { isValidity, getData };
