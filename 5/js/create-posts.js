import {
  POST_COUNT,
  getMiniaturesData,
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
const { POST_DESCRIPTION } = getMiniaturesData();

const createPost = function () {
  return {
    id: createPostId(),
    url: `photos/${createPostUrl()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTION),
    likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
    comments: Array.from({ length: getRandomInteger(COMMENT_COUNT.min, COMMENT_COUNT.max) }, createComment)
  };
};

const createPosts = () => Array.from({ length: POST_COUNT }, createPost);

const postsData = createPosts();

export { postsData };
