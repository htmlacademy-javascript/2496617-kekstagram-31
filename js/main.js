import './api.js';
import './render-thumbnails.js';
import './open-modal.js';
import './validate-form.js';
import './upload-image.js';

import { setUploadFormSubmit } from './validate-form.js';
import { closeUploadModal } from './upload-image.js';


setUploadFormSubmit(closeUploadModal);
