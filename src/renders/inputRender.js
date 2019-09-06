export default (url, urlValidity, element) => {
  const [currentClass, previousClass] = urlValidity ? ['is-valid', 'is-invalid'] : ['is-invalid', 'is-valid'];

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log('current url value');
  console.log(url);

  console.log('!url');
  console.log(!url);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!');

  if (!url) {
    console.log('element.classList:');
    console.log(element.classList);
    console.log('previousClass:');
    console.log(previousClass);
    console.log('currentClass:');
    console.log(currentClass);
    element.classList.remove(previousClass);
    element.classList.remove(currentClass);
  } else {
    element.classList.remove(previousClass);
    element.classList.add(currentClass);
  }
};
