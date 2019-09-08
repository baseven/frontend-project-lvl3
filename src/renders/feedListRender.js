import _ from 'lodash';

export default (link, data, element) => {
  console.log('data:');
  console.log(data);
  console.log('------');

  const newsFeedAttr = data.find(feed => _.has(feed, link))[link];
  console.log('newsFeedAttr:');
  console.log(newsFeedAttr);
  console.log('------');
  // const { title, description, posts } = newsFeedAttr;
  const { title, description, posts } = newsFeedAttr;

  // Создаем элемент div с классом jumbotron
  const divEl = document.createElement('div');
  divEl.classList.add('jumbotron');

  // Создаем элементы: h3, p, ul
  const h3El = document.createElement('h3');
  h3El.textContent = title;

  const pEl = document.createElement('p');
  pEl.textContent = description;

  const ulEl = document.createElement('ul');
  ulEl.setAttribute('id', link);

  // создание списка постов
  posts.forEach((post) => {
    const { postTitle, postLink } = post; // { postTitle, postDescription, postLink }

    // Создаем элемент a и присваиваем атрибуту href значение postLink
    const aEl = document.createElement('a');
    aEl.setAttribute('href', postLink);
    aEl.textContent = postTitle;

    // Создаем элемент li
    const liEl = document.createElement('li');
    // Добавляем aEl в конец списка childNodes элемента liEl
    liEl.append(aEl);
    // Добавляем liEl в конец списка childNodes элемента ulEl
    ulEl.append(liEl);
  });

  // Добавляем divUl, divP, divH3 в конец списка childNodes элемента divEl
  divEl.append(h3El);
  divEl.append(pEl);
  divEl.append(ulEl);
  // Добавляем divEl в конец списка childNodes элемента element
  element.append(divEl);
};

/* использовать что-то подобное для создания списка
  selectedNotebooks.forEach((notebook) => {
    // Создаем текстовый узел
    const textNode = document.createTextNode(notebook.model);
    // Создаем элемент li
    const liEl = document.createElement('li');
    // Добавляем textNode в конец списка childNodes элемента liEl
    liEl.append(textNode);
    // Добавляем liEl в конец списка childNodes элемента ulEl у notebooksList
    notebooksList.append(liEl);
  });
*/
