import { debounce } from './utils.js';
import { renderGallery } from './gallery.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const filtersContainer = document.querySelector('.img-filters');
let currentPhotos = [];

const FILTER_TYPE = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filterHandlers = {
  [FILTER_TYPE.DEFAULT]: (photos) => photos,
  [FILTER_TYPE.RANDOM]: (photos) =>
    [...photos].sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT),
  [FILTER_TYPE.DISCUSSED]: (photos) =>
    [...photos].sort((a, b) => b.comments.length - a.comments.length)
};

const updateGallery = debounce((filterType) => {
  const filteredPhotos = filterHandlers[filterType](currentPhotos);
  renderGallery(filteredPhotos);
}, DEBOUNCE_DELAY);

const onFilterClick = (evt) => {
  if (!evt.target.matches('button')) {
    return;
  }

  const activeButton = filtersContainer.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  updateGallery(evt.target.id.replace('filter-', ''));
};

const initFilters = (photos) => {
  currentPhotos = photos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
  renderGallery(photos);
};

export { initFilters };
