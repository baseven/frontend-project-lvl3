export default (post, element) => {
  const { title, description } = post;

  const modalTitle = element.find('.modal-title');
  modalTitle.text = title;

  const modalDescription = element.find('.modal-description > p');
  modalDescription.text = description;
};
