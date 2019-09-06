import inputRender from './inputRender';
import feedsListRender from './feedsListRender';
import errorMessageRender from './errorMessageRender';

export default (type) => {
  const renderTypes = {
    input: inputRender,
    newsFeedList: feedsListRender,
    dataValidity: errorMessageRender,
  };

  return renderTypes[type];
};
