export default (post, element) => {
  const { postTitle, postDescription } = post;

  const modalTitle = element.find('.modal-title')[0];
  modalTitle.textContent = postTitle;

  const modalDescription = element.find('.modal-body > p')[0];
  modalDescription.textContent = postDescription;
};
