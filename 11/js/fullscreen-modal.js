import { isEscapeKey } from './utils.js';
import { initCommentsPagination } from './comments-pagination.js';
import { postsData } from './render-posts.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureModalOpened = bigPicture.querySelector('.big-picture__preview');
const body = document.body;
let cleanupComments = null;

// Элементы модалки
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const shownCommentsCount = commentCountBlock.querySelector('.social__comment-shown-count');
const totalCommentsCount = commentCountBlock.querySelector('.social__comment-total-count');

// Обработчики закрытия
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // eslint-disable-next-line no-use-before-define
    closeFullscreenModal();
  }
};

// eslint-disable-next-line no-use-before-define
const onCloseButtonClick = () => closeFullscreenModal();

const onNotModalClick = (evt) => {
  if (!bigPictureModalOpened.contains(evt.target)) {
    // eslint-disable-next-line no-use-before-define
    closeFullscreenModal();
  }
};

const openFullscreenModal = (postId) => {
  const post = postsData.find(({ id }) => id === postId);

  // Очищаем предыдущие комментарии
  if (cleanupComments) {
    cleanupComments();
  }

  // Заполняем данные
  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;

  // Инициализация пагинации с сохранением функции очистки
  cleanupComments = initCommentsPagination(
    post.comments,
    socialComments,
    commentsLoader,
    shownCommentsCount,
    totalCommentsCount
  );

  // Показываем модалку
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Обработчики закрытия
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onNotModalClick);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const closeFullscreenModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  // Вызываем очистку комментариев
  if (cleanupComments) {
    cleanupComments();
    cleanupComments = null;
  }

  // Удаляем обработчики
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('click', onNotModalClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
};


export { openFullscreenModal };
