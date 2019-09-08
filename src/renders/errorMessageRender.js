export default (errorMessage, element) => {
  const [currentClass, previousClass] = !errorMessage ? ['invisible', 'visible'] : ['visible', 'invisible'];

  element.classList.remove(previousClass);
  element.classList.add(currentClass);
  // element.textContent = errorMessage; Assignment to property of function parameter 'element'.
};
