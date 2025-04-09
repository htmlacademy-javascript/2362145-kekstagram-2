import { renderPics } from './render-posts.js';
import './upload-form.js';
import { setFormSubmit } from './upload-form.js';
import { closeForm } from './user-modal.js';
import { getData } from './api.js';


getData((response) => renderPics(response));
setFormSubmit(closeForm);

