import { renderThumbnails } from './render-thumbnails.js';
import { pictures } from './api.js';
import { shuffleArray, switchActiveItem, sortPicturesByCommentsAmount, debounce } from './util.js';

// $------------------------ FILTER ------------------------$ //
// $------------------------ FILTER ------------------------$ //

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const SHOWN_PICTURES_AMOUNT = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');

//@ функция, показывающая блок фильтра
/// используется после отрисовки фотографий в render-thumbnails.js
const showFiltersElement = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

/// кнопки фильтра
const defaultButton = filtersElement.querySelector('#filter-default');
const randomButton = filtersElement.querySelector('#filter-random');
const discussedButton = filtersElement.querySelector('#filter-discussed');

//@ функция, привязывающая обработчики на кнопки фильтра
const setFilterButtonClick = (cb, filterButton) => {
  filterButton.addEventListener('click', () => {
    switchActiveItem(filtersElement, filterButton, ACTIVE_BUTTON_CLASS);
    cb();
  });
};

setFilterButtonClick(debounce(
  () => renderThumbnails(pictures), RERENDER_DELAY
), defaultButton);

setFilterButtonClick(debounce(
  () => renderThumbnails(shuffleArray(pictures, SHOWN_PICTURES_AMOUNT)), RERENDER_DELAY
), randomButton);

setFilterButtonClick(debounce(
  () => renderThumbnails(sortPicturesByCommentsAmount(pictures)), RERENDER_DELAY
), discussedButton);


// &------------------------ EXPORT ------------------------& //
export { showFiltersElement };
