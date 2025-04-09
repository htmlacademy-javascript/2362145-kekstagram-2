const ALERT_SHOW_TIME = 5000;

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  let previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      previousValues = [];
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (tag) => {
  const alertTemplate = document.querySelector(`#${tag}`);
  const alertElement = alertTemplate.content.cloneNode(true);
  const alertContainer = alertElement.querySelector(`.${tag}`);

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  isEscapeKey,
  showAlert
};
