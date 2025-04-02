import { isEscapeKey } from './utils.js';
import { initScale, destroyScale, resetScale } from './scale.js';
import { initEffect, destroyEffect, resetEffect } from './effect.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const overlayElement = form.querySelector('.img-upload__wrapper');
const uploadImgPreview = form.querySelector('.img-upload__preview img');


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

/**
 * Нормализует строку хэштегов, заменяя множественные пробелы на один
 * @param {string} value - строка с хэштегами
 * @returns {string} - нормализованная строка
 */
const normalizeHashtags = (value) => {
  if (!value.trim()) {
    return '';
  }
  return value.trim().replace(/\s+/g, ' ');
};

/**
 * Получает массив хэштегов из строки
 * @param {string} value - строка с хэштегами
 * @returns {string[]} - массив хэштегов
 */
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

// Обработчики событий
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDocumentClick = (evt) => {
  if (!overlayElement.contains(evt.target)) {
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // загружаем изображение
  uploadImgPreview.src = URL.createObjectURL(uploadInput.files[0]);

  // инициализируем масштаб и эффект
  initScale();
  initEffect();

  // добавляем обработчики событий
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
  hashtagInput.addEventListener('keydown', onInputKeydown);
  hashtagInput.addEventListener('blur', onHashtagInputBlur);
  commentInput.addEventListener('keydown', onInputKeydown);
};

const closeForm = () => {
  // сбрасываем форму
  form.reset();
  uploadInput.value = '';
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pristine.reset();
  resetScale();
  resetEffect();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  hashtagInput.removeEventListener('keydown', onInputKeydown);
  hashtagInput.removeEventListener('blur', onHashtagInputBlur);
  commentInput.removeEventListener('keydown', onInputKeydown);
  destroyScale();
  destroyEffect();
};

// Инициализация
uploadInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);

form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Всегда предотвращаем отправку

  // Нормализуем хэштеги перед валидацией при отправке
  hashtagInput.value = normalizeHashtags(hashtagInput.value);
  commentInput.value = commentInput.value.trim();

  if (pristine.validate()) {
    // Только при успешной валидации
    form.submit();
  }
});
