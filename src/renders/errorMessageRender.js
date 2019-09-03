export default (validity, element) => {
  const [currentClass, previousClass] = validity ? ['invisible', 'visible'] : ['visible', 'invisible'];

  element.classList.remove(previousClass);
  element.classList.add(currentClass);
};
