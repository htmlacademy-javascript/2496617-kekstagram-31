//# получение данных для отрисовки картинок

import { renderThumbnails } from './render-thumbnails.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    renderThumbnails(pictures);
  });

