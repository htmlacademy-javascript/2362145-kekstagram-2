const renderGallery = (photos) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;

  // Удаляем предыдущие фото
  container.querySelectorAll('.picture').forEach((picture) => picture.remove());

  // Создаем новые элементы
  const fragment = document.createDocumentFragment();
  photos.forEach(({ id, url, likes, comments }) => {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture').dataset.id = id;
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export { renderGallery };
