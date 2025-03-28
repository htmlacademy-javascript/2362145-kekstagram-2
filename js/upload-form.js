const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const overlayElement = form.querySelector('.img-upload__wrapper');

// Конфигурация
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

// Регулярное выражение для хэштега
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // Поле пустое - валидно
  }

  const hashtags = value.toLowerCase().split(/\s+/);

  // Проверка условий
  const isValid = hashtags.every((tag) => {
    const isFormatValid = HASHTAG_REGEX.test(tag);
    const isLengthValid = tag.length <= HASHTAG_MAX_LENGTH;
    return isFormatValid && isLengthValid;
  }) &&
  hashtags.length <= HASHTAG_MAX_COUNT &&
  new Set(hashtags).size === hashtags.length;

  return isValid;
};

// Валидация комментария
const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

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
  - Быть короче ${HASHTAG_MAX_LENGTH} символов
  - Максимум ${HASHTAG_MAX_COUNT} уникальных тегов`
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${COMMENT_MAX_LENGTH} символов`
);

// Обработчики событий
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text__description')) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onDocumentClick = (evt) => {
  if (!overlayElement.contains(evt.target) && !evt.target.closest('.img-upload__input')) {
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
