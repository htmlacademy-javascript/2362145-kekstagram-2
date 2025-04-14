const COMMENTS_PER_PAGE = 5;
const AVATAR_ROUND_SIZE = 35;

const initCommentsPagination = (comments, container, loader, counter, total) => {
  const currentComments = [...comments];
  let shownComments = 0;

  const renderNextComments = () => {
    const commentsPortion = currentComments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

    if (shownComments === 0) {
      container.innerHTML = '';
    }

    commentsPortion.forEach(({ avatar, name, message }) => {
      const comment = document.createElement('li');
      comment.className = 'social__comment';

      const img = document.createElement('img');
      img.className = 'social__picture';
      img.src = avatar;
      img.alt = name;
      img.width = AVATAR_ROUND_SIZE;
      img.height = AVATAR_ROUND_SIZE;

      const text = document.createElement('p');
      text.className = 'social__text';
      text.textContent = message;

      comment.append(img, text);
      container.append(comment);
    });

    shownComments += commentsPortion.length;
    counter.textContent = shownComments;

    if (shownComments >= currentComments.length) {
      loader.classList.add('hidden');
    }
  };

  const loadMoreHandler = () => renderNextComments();
  loader.removeEventListener('click', loadMoreHandler);
  loader.addEventListener('click', loadMoreHandler);

  if (currentComments.length === 0) {
    container.innerHTML = '';
    loader.classList.add('hidden');
    counter.textContent = '0';
    total.textContent = '0';
  } else {
    loader.classList.remove('hidden');
    total.textContent = currentComments.length;
    renderNextComments();
  }

  return () => {
    loader.removeEventListener('click', loadMoreHandler);
  };
};

export { initCommentsPagination };
