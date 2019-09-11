import inputBorderRender from './inputBorderRender';
import feedsListRender from './feedsListRender2';
import errorMessageRender from './errorMessageRender';
import inputValueRender from './inputValueRender';
import modalPostRender from './modalPostRender';

export default (type) => {
  const renderTypes = {
    inputBorder: inputBorderRender,
    inputValue: inputValueRender,
    feedsList: feedsListRender,
    errorMessage: errorMessageRender,
    modalPost: modalPostRender,
  };

  return renderTypes[type];
};
