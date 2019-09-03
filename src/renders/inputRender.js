export default (stateInput, element) => {
  const { url, urlValidity } = stateInput;
  const [currentClass, previousClass] = urlValidity ? ['is-valid', 'is-invalid'] : ['is-invalid', 'is-valid'];

  if (!url) {
    element.classList.remove(previousClass);
    element.classList.remove(currentClass);
  }

  element.classList.remove(previousClass);
  element.classList.add(currentClass);
};
