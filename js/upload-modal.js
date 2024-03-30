import { isEscKey, checkInputsFocus } from './util.js';
import { pristine, setUploadFormSubmit, formElement } from './upload-form.js';
import { effectsListElement, onEffectsListElementChange, scaleElement, onScaleElementClick, resetStyles } from './edit-image.js';

// $======================== UPLOAD MODAL ========================$ //
// $======================== UPLOAD MODAL ========================$ //

const uploadImgInputElement = document.querySelector('.img-upload__input');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const closeButton = uploadModalElement.querySelector('.img-upload__cancel');

// # обработчик нажатия на кнопку 'Загрузить фото' - открывает модальное окно с формой
const onUploadImgInputElementChange = () => {
  openUploadModal();
};

// # обработчик нажатия на крестик - закрывает модальное окно с формой
const onCloseButtonClick = () => {
  closeUploadModal();
};

//# обработчик нажатия на кнопку ESC - закрывает модальное окно с формой
const onDocumentKeydown = (evt) => {
  if (isEscKey(evt) && !checkInputsFocus() && !document.querySelector('.error')) {
    closeUploadModal();
  }
};

//@ --------- функция, открывающая форму загрузки и обработки изображения --------- @//
function openUploadModal() {
  uploadModalElement.classList.remove('hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');

  //# настройка размера картинки
  scaleElement.addEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.addEventListener('change', onEffectsListElementChange);
}

//@ --------- функция, закрывающая форму загрузки и обработки изображения --------- @//
function closeUploadModal() {
  uploadModalElement.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.classList.remove('modal-open');

  //# настройка размера картинки
  scaleElement.removeEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.removeEventListener('change', onEffectsListElementChange);

  //# сброс значения поля выбора файла
  formElement.reset();

  //# удаление сообщений-ошибок
  pristine.reset();

  //# сброс стилей
  resetStyles();
}

//# загрузка фото
uploadImgInputElement.addEventListener('change', onUploadImgInputElementChange);

setUploadFormSubmit(closeUploadModal);


// &------------------------ EXPORT ------------------------& //
export { openUploadModal, closeUploadModal };
