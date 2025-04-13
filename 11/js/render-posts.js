import { openFullscreenModal } from './fullscreen-modal.js';

const similarListElement = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let postsData = [];

const renderPics = (data) => {
  postsData = data;
  const similarListFragment = document.createDocumentFragment();

  similarListElement.querySelectorAll('.picture').forEach((picture) => picture.remove());

  postsData.forEach(({ id, url, description, likes, comments }) => {
    const picturePost = similarPictureTemplate.cloneNode(true);
    const picturePostImg = picturePost.querySelector('.picture__img');
    picturePost.dataset.id = id;
    picturePostImg.src = url;
    picturePostImg.alt = description;
    picturePost.querySelector('.picture__comments').textContent = comments.length;
    picturePost.querySelector('.picture__likes').textContent = likes;
    picturePost.addEventListener('click', () => openFullscreenModal(id));
    similarListFragment.appendChild(picturePost);
  });

  similarListElement.appendChild(similarListFragment);
};

export { renderPics, postsData };
