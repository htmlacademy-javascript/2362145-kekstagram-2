import { isEscapeKey } from './utils.js';

const REMOVE_ERROR_MESSAGE_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadingErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');


export const showLoadingDataError = () => {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_ERROR_MESSAGE_TIME);
};

export const showUploadingDataError = () => {
  const uploadingErrorMessage = uploadingErrorTemplate.cloneNode(true);
  const errorButton = uploadingErrorMessage.querySelector('.error__button');

  const existingError = document.querySelector('.error');
  if (existingError) {
    existingError.remove();
  }
  body.append(uploadingErrorMessage);

  const onBodyEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  const onBodyClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  };

  const onErrorButtonClick = (evt) => {
    evt.stopPropagation();
    closeErrorMessage();
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onBodyEscKeydown);
  document.addEventListener('click', onBodyClick);

  function closeErrorMessage() {
    document.removeEventListener('keydown', onBodyEscKeydown);
    document.removeEventListener('click', onBodyClick);
    errorButton.removeEventListener('click', onErrorButtonClick);

    uploadingErrorMessage.remove();
  }
};

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  function onSuccessButtonClick () {
    removeSuccessMessage();
  }

  function removeSuccessMessage () {
    successMessage.remove();
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentEscKeydown (evt) {
    if (!isEscapeKey(evt)) {
      return;
    }
    evt.preventDefault();
    removeSuccessMessage();
  }

  function onDocumentClick (evt) {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  }
};
