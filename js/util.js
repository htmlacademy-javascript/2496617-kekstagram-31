// $------------------------ UTILITIES ------------------------$ //
// $------------------------ UTILITIES ------------------------$ //

//@ функция, проверяющая, что нажатая клавиша - ESC
const isEscKey = (evt) => evt.key === 'Escape';

//@ функция, разбивающая по пробелу значение инпута на массив
const splitInput = (input) => input.value.toLowerCase().split(' ');

//@ функция, проверяющая, что есть инпуты в фокусе
const checkInputsFocus = () => {
  if (document.activeElement.classList.contains('text__hashtags') || document.activeElement.tagName === 'TEXTAREA') {
    return true;
  }
};

//@ функция, "устраняющая дребезг"
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//@ функция, возвращающая перемешанный массив на основе переданного
/// amount - количество отобранных элементов
const shuffleArray = (array, amount) => array.slice().sort(() => Math.random() - 0.5).slice(0, amount);

//@ функция, возвращающая массив картинок, отсортированный по убыванию количества комментариев
const sortPicturesByCommentsAmount = (array) => array.slice().sort((a, b) => b.comments.length - a.comments.length);

//@ функция, очищающая контейнер
const clearContainer = (container, elementClass) => {
  const elements = container.querySelectorAll(`.${elementClass}`);
  elements.forEach((element) => {
    element.remove();
  });
};

//@ функция, переключающая активные элементы (фильтры)
const switchActiveItem = (container, selectedItem, activeClass) => {
  const active = container.querySelector(`.${activeClass}`);
  if (active) {
    active.classList.remove(activeClass);
  }
  selectedItem.classList.add(activeClass);
};

// &------------------------ EXPORT ------------------------& //
export { isEscKey, splitInput, checkInputsFocus, debounce, shuffleArray, clearContainer, switchActiveItem, sortPicturesByCommentsAmount };
