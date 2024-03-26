import './api.js';
import './render-thumbnails.js';
import './open-modal.js';
import './upload-form.js';
import './upload-modal.js';

import { setUploadFormSubmit } from './upload-form.js';
import { closeUploadModal } from './upload-modal.js';


setUploadFormSubmit(closeUploadModal);
