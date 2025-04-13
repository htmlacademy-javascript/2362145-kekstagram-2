import { renderPics } from './render-posts.js';
import './upload-form.js';
import { setFormSubmit } from './upload-form.js';
import { closeForm } from './user-modal.js';
import { getData } from './api.js';
import { showLoadingDataError } from './alerts.js';
import { initFilters } from './filters.js';

setFormSubmit(closeForm);

const initApp = () => {
  getData()
    .then((photos) => {
      renderPics(photos);
      initFilters(photos);
    }
    )
    .catch(() => {
      showLoadingDataError();
    });
};

initApp();
