import { isURL } from 'validator';
import axios from 'axios';

/**
 * Валидация дублей:
 * Если url уже входит в состав links, то вернуть false
 * Валидация URL
 * Если url пустой или проходит проверку isURL, то вернуть true
 */
const isValidity = (url, newsFeedList) => {
  console.log('!!!');
  console.log('newsFeedList');
  console.log(newsFeedList);
  console.log('-----');

  const links = newsFeedList.map(obj => Object.keys(obj)).flat();
  console.log('links');
  console.log(links);
  console.log('-----');
  if (links.includes(url)) {
    return false;
  }
  return !url || isURL(url);
};

/**
 * https://corsproxy.github.io/
 * For example, if you wanted to grab the Google homepage, your code would request
 * https://crossorigin.me/https://google.com
 */
const getData = (url) => { // стоит добавить просто return
  axios.get(`https://crossorigin.me/${url}`)
    .then(response => response)
    .catch(error => error);
};

const getFeedData = url => (
  axios(`https://cors-anywhere.herokuapp.com/${url}`).then(response => response.data)
);

export { isValidity, getData, getFeedData };
