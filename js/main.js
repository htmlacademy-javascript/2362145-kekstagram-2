const POST_COUNT = 25;
const POST_COMMENT_AVATAR_COUNT = 6;
//отдельные переменные где хранятся id, что-бы они не повторялись
const createPostId = createRandomIdFromRangeGenerator(1, POST_COUNT);
const createPostUrl = createRandomIdFromRangeGenerator(1, POST_COUNT);
const createCommentPostId = createRandomIdFromRangeGenerator(1, POST_COUNT * 10);
const createCommentPostAvatar = () => getRandomInteger(1, POST_COMMENT_AVATAR_COUNT);
const LIKES_COUNT = {
  min: 15,
  max: 200
};
const COMMENT_COUNT = {
  min: 0,
  max: 30
};
const POST_DESCRIPTION = [
  'Достойный сын своего народа',
  'Звать меня бесполезно, лучше буду спокойно отдыхать',
  'Главный ночной тыгыдык',
  'Если бы вы знали как мне пофиг на всё, вы бы расплакались',
  'Просто дайте мне вкусняшку',
  'Если вы видели плохих котов, то забудьте'
];
const POST_COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const POST_COMMENT_NAME = [
  'Барсик',
  'Пушок',
  'Снежок',
  'Лапусик',
  'Паша',
  'Кнопа'
];

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = function () {
  return {
    id: createCommentPostId(),
    avatar: `img/avatar-${createCommentPostAvatar()}.svg`,
    message: getRandomArrayElement(POST_COMMENT_MESSAGE),
    name: getRandomArrayElement(POST_COMMENT_NAME)
  };
};

const createPost = function () {
  return {
    id: createPostId(),
    url: `photos/${createPostUrl()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTION),
    likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
    comments: Array.from({ length: getRandomInteger(COMMENT_COUNT.min, COMMENT_COUNT.max) }, createComment)
  };
};

// eslint-disable-next-line no-unused-vars
const similarPost = Array.from({ length: POST_COUNT }, createPost);
// УДАЛИТЬ ВСЕ ЧТО НИЖЕ
// eslint-disable-next-line no-console
console.log(similarPost);
