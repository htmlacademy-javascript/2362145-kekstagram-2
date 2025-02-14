import {
  POST_COUNT,
  POST_COMMENT_AVATAR_COUNT,
  POST_COMMENT_MESSAGE,
  POST_COMMENT_NAME
} from './data.js';

import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement
} from './utils.js';

const createCommentPostId = createRandomIdFromRangeGenerator(1, POST_COUNT * 10);
const createCommentPostAvatar = () => getRandomInteger(1, POST_COMMENT_AVATAR_COUNT);

const createComment = function () {
  return {
    id: createCommentPostId(),
    avatar: `img/avatar-${createCommentPostAvatar()}.svg`,
    message: getRandomArrayElement(POST_COMMENT_MESSAGE),
    name: getRandomArrayElement(POST_COMMENT_NAME)
  };
};

export { createComment };
