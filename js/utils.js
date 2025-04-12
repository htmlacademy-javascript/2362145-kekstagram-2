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
  // const alertInner = alertContainer.querySelector(`.${tag}__inner`);

  let onEscKeydown = null;
  // let onOutsideClick = null;

  function closeAlert() {
    alertContainer.remove();
    document.removeEventListener('keydown', onEscKeydown);
    // document.removeEventListener('click', onOutsideClick);
  }

  onEscKeydown = function (evt) {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  };

  // onOutsideClick = function (evt) {
  //   if (!alertInner.contains(evt.target)) {
  //     closeAlert();
  //   }
  // };

  document.body.append(alertContainer);

  document.addEventListener('keydown', onEscKeydown);
  // document.addEventListener('click', onOutsideClick);

  if (tag === 'data-error') {
    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
    document.removeEventListener('keydown', onEscKeydown);
    // document.removeEventListener('click', onOutsideClick);
  }

  const errorButton = alertContainer.querySelector(`.${tag}__button`);
  if (errorButton) {
    errorButton.addEventListener('click', closeAlert);
  }
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
  showAlert,
  debounce
};
