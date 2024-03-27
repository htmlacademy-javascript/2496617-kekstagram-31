import { pictures } from './api.js';

// $======================== RENDER THUMBNAILS ========================$ //
// $======================== RENDER THUMBNAILS ========================$ //

//# шаблон миниатюры
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//# список-сетка миниатюр
const thumbnailsListElement = document.querySelector('.pictures');

//@ функция, отрисовывающая миниатюры
const renderThumbnails = (picturesObjects) => {
  //# фрагмент
  const thumbnailsListFragment = document.createDocumentFragment();

  //# присвоение данных в шаблон миниатюр
  picturesObjects.forEach(
    ({ id, url, description, likes, comments }) => {
      const thumbnailElement = pictureTemplate.cloneNode(true);
      thumbnailElement.querySelector('.picture__img').src = url;
      thumbnailElement.querySelector('.picture__img').alt = description;
      thumbnailElement.querySelector('.picture__likes').textContent = likes;
      thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

      //# присвоение миниатюре идентификатора, соответствующего идентификатора
      thumbnailElement.setAttribute('id', id);

      thumbnailsListFragment.append(thumbnailElement);
    }
  );

  thumbnailsListElement.append(thumbnailsListFragment);
};

if (pictures) {
  renderThumbnails(pictures);
}
