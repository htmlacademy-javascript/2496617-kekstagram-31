import { picturesArray } from './data.js';

//# шаблон миниатюры
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//# список-сетка миниатюр
const picturesListElement = document.querySelector('.pictures');

//# фрагмент
const picturesListFragment = document.createDocumentFragment();

//# присвоение данных в шаблон миниатюр
picturesArray.forEach(
  ({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    //# присвоение миниатюре идентификатора, соответствующего идентификатора
    pictureElement.setAttribute('id', id);

    picturesListFragment.append(pictureElement);
  }
);

picturesListElement.append(picturesListFragment);
