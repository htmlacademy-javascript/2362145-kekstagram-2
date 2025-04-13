import { isEscapeKey } from './utils.js';
import { initScale, destroyScale, resetScale } from './scale.js';
import { initEffect, destroyEffect, resetEffect } from './effect.js';
import { onHashtagInputBlur, pristine } from './upload-form.js';
import { showUploadingDataError } from './alerts.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
// const overlayElement = form.querySelector('.img-upload__overlay');
const uploadImgPreview = form.querySelector('.img-upload__preview img');

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
  // document.addEventListener('click', onDocumentClick);
  hashtagInput.addEventListener('keydown', onInputKeydown);
  hashtagInput.addEventListener('blur', onHashtagInputBlur);
  commentInput.addEventListener('keydown', onInputKeydown);
};

const closeForm = (resetForm = true) => {
  if (resetForm) {
    form.reset();
    uploadInput.value = '';
    pristine.reset();
  }

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetScale();
  resetEffect();

  document.removeEventListener('keydown', onEscKeydown);
  // document.removeEventListener('click', onDocumentClick);
  hashtagInput.removeEventListener('keydown', onInputKeydown);
  hashtagInput.removeEventListener('blur', onHashtagInputBlur);
  commentInput.removeEventListener('keydown', onInputKeydown);

  destroyScale();
  destroyEffect();
};

// Инициализация
uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadImgPreview.src = URL.createObjectURL(file);
    openForm();
  } else {
    showUploadingDataError();
  }
});

closeButton.addEventListener('click', closeForm);

export { openForm, closeForm };
