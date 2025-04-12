import { sendData } from './api.js';
const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const submitButton = uploadOverlay.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const CONFIG = {
  HASHTAG: {
    MAX_LENGTH: 20,
    MAX_COUNT: 5,
    REGEX: /^#[a-zа-яё0-9]{1,19}$/i
  },
  COMMENT: {
    MAX_LENGTH: 140
  }
};

const normalizeHashtags = (value) => {
  if (!value.trim()) {
    return '';
  }
  return value.trim().replace(/\s+/g, ' ');
};

const getHashtagsArray = (value) => {
  if (!value.trim()) {
    return [];
  }
  return normalizeHashtags(value).toLowerCase().split(' ');
};

// Отдельные проверки валидации хэштегов
const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  return hashtags.every((tag) => CONFIG.HASHTAG.REGEX.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= CONFIG.HASHTAG.MAX_COUNT;
};

const validateHashtagUniqueness = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Валидация комментария
const validateComment = (value) => value.length <= CONFIG.COMMENT.MAX_LENGTH;

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div'
});

// Обновляем добавление валидаторов с отдельными сообщениями
pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры<br> но не болше 20 символов на один хэштег, включая решетку'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  `Максимальное количество хэштегов - ${CONFIG.HASHTAG.MAX_COUNT}`
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUniqueness,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Длина комментария не может превышать ${CONFIG.COMMENT.MAX_LENGTH} символов`
);

// Обработчик для нормализации введенных хэштегов (замена множественных пробелов)
const onHashtagInputBlur = () => {
  const normalizedValue = normalizeHashtags(hashtagInput.value);
  hashtagInput.value = normalizedValue;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export { pristine, onHashtagInputBlur, setFormSubmit };
