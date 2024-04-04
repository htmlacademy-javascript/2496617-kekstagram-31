import { renderThumbnails, pictures } from './render-thumbnails.js';
import { shuffleArray, sortPicturesByCommentsAmount, debounce } from './util.js';

// $------------------------ FILTER ------------------------$ //
// $------------------------ FILTER ------------------------$ //

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const SHOWN_PICTURES_AMOUNT = 10;
const RERENDER_DELAY = 500;

const ButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');

//@ функция, показывающая блок фильтра
/// используется после отрисовки фотографий в render-thumbnails.js
const showFiltersElement = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

//@ функция, привязывающая обработчики на кнопки фильтра
const setFilterButtonsClick = (cb) => {
  filtersElement.addEventListener('click', (evt) => {
    const clickedElement = evt.target;
    const activeButton = filtersElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
    if (clickedElement.classList.contains('img-filters__button')) {
      if (activeButton) {
        activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
      }
      clickedElement.classList.add(ACTIVE_BUTTON_CLASS);
    }
    cb(clickedElement);
  });
};

setFilterButtonsClick(debounce(
  (clickedElement) => {

    switch (clickedElement.id) {
      case ButtonId.DEFAULT:
        renderThumbnails(pictures);
        break;
      case ButtonId.RANDOM:
        renderThumbnails(shuffleArray(pictures, SHOWN_PICTURES_AMOUNT));
        break;
      case ButtonId.DISCUSSED:
        renderThumbnails(sortPicturesByCommentsAmount(pictures));
        break;
    }
  }, RERENDER_DELAY)
);


// &------------------------ EXPORT ------------------------& //
export { showFiltersElement };
