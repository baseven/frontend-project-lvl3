export default (errorMessage, element) => {
  const [currentClass, previousClass] = !errorMessage ? ['invisible', 'visible'] : ['visible', 'invisible'];

  element.classList.remove(previousClass);
  element.classList.add(currentClass);
  element.textContent = errorMessage; // eslint-disable-line no-param-reassign
};
