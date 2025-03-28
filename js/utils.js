function getRandomInteger (a, b) {
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

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const message = template.cloneNode(true);
  const messageElement = message.querySelector(`.${type}__inner`);
  const closeButton = message.querySelector(`.${type}__button`);

  document.body.appendChild(message);

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!messageElement.contains(evt.target)) {
      closeMessage();
    }
  };

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  isEscapeKey,
  showMessage,
  debounce
};
