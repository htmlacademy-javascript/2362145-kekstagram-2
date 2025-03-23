import { postsData } from './create-posts.js';
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureModalOpened = bigPicture.querySelector('.big-picture__preview');
const body = document.body;
const avatarRoundSize = 35;

// Элементы модалки
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Создание комментария через DocumentFragment
const createCommentElement = ({ avatar, name, message }) => {
  const fragment = document.createDocumentFragment();
  const comment = document.createElement('li');
  comment.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = avatarRoundSize;
  img.height = avatarRoundSize;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = message;

  comment.append(img, text);
  fragment.append(comment);

  return fragment;
};

// Пакетный рендер комментариев
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};

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

  // Рендер комментариев
  renderComments(post.comments);

  // Скрываем ненужные элементы
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Показываем модалку
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Обработчики
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onNotModalClick);
  closeButton.addEventListener('click', onCloseButtonClick);
};

export { openFullscreenModal };
