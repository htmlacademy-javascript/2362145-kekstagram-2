// завел так переменные что-бы в случае чего, только одну переменную поменять
const CAT_COUNT = 25;
const CAT_COMMENT_AVATAR_COUNT = 6;
const createCatId = createRandomIdFromRangeGenerator(1, CAT_COUNT);
const createCommentCatAvatar = createRandomIdFromRangeGenerator(1, CAT_COMMENT_AVATAR_COUNT);
const createCommentCatId = createRandomIdFromRangeGenerator(1, 1000);
const createCatPhoto = createRandomIdFromRangeGenerator(1, CAT_COUNT);
const CAT_DESCRIPTION = [
  'Достойный сын своего народа',
  'Звать меня бесполезно, лучше буду спокойно отдыхать',
  'Главный ночной тыгыдык',
  'Если бы вы знали как мне пофиг на всё, вы бы расплакались',
  'Просто дайте мне вкусняшку',
  'Если вы видели плохих котов, то забудьте'
];
const CAT_COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const CAT_COMMENT_NAME = [
  'Барсик',
  'Пушок',
  'Снежок',
  'Лапусик',
  'Паша',
  'Кнопа'
];

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function someFunction () {
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

const createComment = () => ({
  id: createCommentCatId,
  avatar: `img/avatar-${createCommentCatAvatar}.svg`,
  message: getRandomArrayElement(CAT_COMMENT_MESSAGE),
  name: getRandomArrayElement(CAT_COMMENT_NAME)
});

const createCat = () => ({
  id: createCatId,
  url: `photos/${createCatPhoto}.jpg`,
  description: getRandomArrayElement(CAT_DESCRIPTION),
  likes: getRandomInteger(0,30),
  comments: Array.from({length: getRandomInteger(1, 30)}, createComment)
});

// eslint-disable-next-line no-unused-vars
const similarCat = Array.from({ length: CAT_COUNT }, createCat);


