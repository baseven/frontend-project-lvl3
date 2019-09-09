import inputBorderRender from './inputBorderRender';
import feedListRender from './feedListRender';
import errorMessageRender from './errorMessageRender';
import inputValueRender from './inputValueRender';
import modalPostRender from './modalPostRender';

export default (type) => {
  const renderTypes = {
    inputBorder: inputBorderRender,
    inputValue: inputValueRender,
    feedList: feedListRender,
    errorMessage: errorMessageRender,
    modalPost: modalPostRender,
  };

  return renderTypes[type];
};
