import { isEscapeKey } from './utils';
const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const overlayElement = form.querySelector('.img-upload__wrapper');

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

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length <= CONFIG.HASHTAG.MAX_COUNT
    && uniqueHashtags.size === hashtags.length
    && hashtags.every((tag) => CONFIG.HASHTAG.REGEX.test(tag));
};

// Валидация комментария
const validateComment = (value) => value.length <= CONFIG.COMMENT.MAX_LENGTH;

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
  errorTextTag: 'div'
});

// Добавление валидаторов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  `Хэштеги должны:
  - Начинаться с #
  - Содержать только буквы/цифры
  - Быть короче ${CONFIG.HASHTAG.MAX_LENGTH} символов
  - Максимум ${CONFIG.HASHTAG.MAX_COUNT} уникальных тегов`
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${CONFIG.COMMENT.MAX_LENGTH} символов`
);

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
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
  hashtagInput.addEventListener('keydown', onInputKeydown);
  commentInput.addEventListener('keydown', onInputKeydown);
};

const closeForm = () => {
  form.reset();
  uploadInput.value = '';
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pristine.reset();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  hashtagInput.removeEventListener('keydown', onInputKeydown);
  commentInput.removeEventListener('keydown', onInputKeydown);
};

// Инициализация
uploadInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);

form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Всегда предотвращаем отправку

  if (pristine.validate()) {
    // Только при успешной валидации
    form.submit();
  }
});
