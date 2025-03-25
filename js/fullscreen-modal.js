import { postsData } from './create-posts.js';
import { isEscapeKey } from './utils.js';
import { initCommentsPagination, destroyCommentsPagination } from './comments-pagination.js';


const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureModalOpened = bigPicture.querySelector('.big-picture__preview');
const body = document.body;

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

// Закрытие модалки
const closeFullscreenModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  destroyCommentsPagination(commentsLoader);

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('click', onNotModalClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

// Открытие модалки
const openFullscreenModal = (postId) => {
  const post = postsData.find(({ id }) => id === postId);

  // Заполняем данные
  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;

  // Инициализация отрисовки комментариев
  initCommentsPagination(
    post.comments,
    socialComments,
    commentsLoader,
    shownCommentsCount,
    totalCommentsCount
  );

  // Показываем модалку
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Обработчики
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onNotModalClick);
  closeButton.addEventListener('click', onCloseButtonClick);
};

export { openFullscreenModal };
