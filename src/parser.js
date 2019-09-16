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
  const itemElements = doc.querySelectorAll('item');

  const items = [...itemElements];
  const posts = makePostsList(items);

  return { title, description, posts };
};
