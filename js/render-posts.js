import { postsData } from './create-posts.js';

const similarListElement = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderPics = () => {
  const similarListFragment = document.createDocumentFragment();

  postsData.forEach(({ id, url, description, likes, comments }) => {
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
};


export { renderPics };
