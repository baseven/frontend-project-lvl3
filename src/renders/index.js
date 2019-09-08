import inputBorderRender from './inputBorderRender';
import feedListRender from './feedListRender';
import errorMessageRender from './errorMessageRender';

export default (type) => {
  const renderTypes = {
    inputBorder: inputBorderRender,
    feedList: feedListRender,
    errorMessage: errorMessageRender,
  };

  return renderTypes[type];
};
