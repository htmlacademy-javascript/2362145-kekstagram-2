import { postsData } from './create-posts.js';

document.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarListElement = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const depictPosts = postsData;

const similarListFragment = document.createDocumentFragment();

depictPosts.forEach(({id, url, description, likes, comments}) => {
  const picturePost = similarPictureTemplate.cloneNode(true);
  const picturePostImg = picturePost.querySelector('.picture__img');
  picturePost.id = id;
  picturePostImg.src = url;
  picturePostImg.alt = description;
  picturePost.querySelector('.picture__comments').textContent = comments.length;
  picturePost.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(picturePost);
});

similarListElement.appendChild(similarListFragment);

export { similarListElement };
