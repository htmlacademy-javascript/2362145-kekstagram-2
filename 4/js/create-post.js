import {
  POST_COUNT,
  POST_DESCRIPTION,
  LIKES_COUNT,
  COMMENT_COUNT
} from './data.js';

import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement
} from './utils.js';

import { createComment } from './create-comment.js';

const createPostId = createRandomIdFromRangeGenerator(1, POST_COUNT);
const createPostUrl = createRandomIdFromRangeGenerator(1, POST_COUNT);

const createPost = function () {
  return {
    id: createPostId(),
    url: `photos/${createPostUrl()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTION),
    likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
    comments: Array.from({ length: getRandomInteger(COMMENT_COUNT.min, COMMENT_COUNT.max) }, createComment)
  };
};

const similarPost = () => Array.from({ length: POST_COUNT }, createPost);

export { similarPost };
