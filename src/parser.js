
/**
 * Реализуем скачивание потока и парсинг полученных данных потока.
 * ! Добавление нужных данных в соответствующие списки выполняется в watch
 * -
 * Скачиваем данные. upd. вынес в utils
 * Парсим данные
 * Проверяем, соответствуют ли формат, скачанных данных, xml
 * Возвращаем структуру следующего формата: { newsFeed: [article1, article2, ..., arcticleN] }
 */

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

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const itemElements = doc.querySelectorAll('item'); // nodeList
  const items = [...itemElements]; // array
  const posts = makePostsList(items);

  // return doc;

  return { title, description, posts };
};
