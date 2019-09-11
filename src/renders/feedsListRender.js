export default (feedsList, element) => {
  element.querySelectorAll('.jumbotron').forEach(node => node.remove());

  feedsList.forEach((feed) => {
    const link = Object.keys(feed)[0];
    const feedAttributes = feed[link];
    const { title, description, posts } = feedAttributes;
    // Создание области newsFeed
    const jumbotron = document.createElement('div');
    jumbotron.classList.add('jumbotron');

    // Создание header для newsFeed, состоящего из title, description.
    const feedTitle = document.createElement('h3');
    feedTitle.textContent = title;

    const feedDescription = document.createElement('p');
    feedDescription.textContent = description;

    // Создание body для newsFeed, состоящего из маркированнго списка link
    // Каждый элемент списка начинается с тега <li> и является постом
    const feedLink = document.createElement('ul');
    feedLink.classList.add('list-group');
    feedLink.setAttribute('id', link);

    posts.forEach((post) => {
      const { postTitle, postDescription, postLink } = post;

      const aElement = document.createElement('a');
      aElement.setAttribute('href', postLink);
      aElement.textContent = postTitle;

      const buttonElement = document.createElement('button');
      buttonElement.setAttribute('type', 'button');
      buttonElement.classList.add('btn', 'btn-info', 'btn-sm');
      buttonElement.setAttribute('data-toggle', 'modal');
      buttonElement.setAttribute('data-target', '#modalPost');
      buttonElement.setAttribute('data-title', postTitle);
      buttonElement.setAttribute('data-description', postDescription);
      buttonElement.textContent = 'Read more';

      const liElement = document.createElement('li');
      liElement.classList.add('list-group-item');
      liElement.append(aElement);
      liElement.append(buttonElement);

      feedLink.append(liElement);
    });

    jumbotron.append(feedTitle);
    jumbotron.append(feedDescription);
    jumbotron.append(feedLink);

    element.append(jumbotron);
  });
};
