import { getData } from './api.js';
import { clearContainer } from './util.js';
import { showFiltersElement } from './filter.js';

// $======================== RENDER THUMBNAILS ========================$ //
// $======================== RENDER THUMBNAILS ========================$ //

//# присвоение данных в переменную
const pictures = await getData();

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

      thumbnailsListFragment.innerHTML = '';
      thumbnailsListFragment.append(thumbnailElement);
    }
  );

  clearContainer(thumbnailsListElement, 'picture');
  thumbnailsListElement.append(thumbnailsListFragment);
  showFiltersElement();
};

if (pictures) {
  renderThumbnails(pictures);
}

// &------------------------ EXPORT ------------------------& //
export { renderThumbnails, pictures };
