export default (dataValidity, element) => {
  if (dataValidity) {
    element.value = ''; // eslint-disable-line no-param-reassign
  }
};
