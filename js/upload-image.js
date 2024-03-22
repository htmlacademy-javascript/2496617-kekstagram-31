import { isEscKey, checkInputsFocus } from './util.js';
import { formElement, onFormSubmit, pristine } from './validate-form.js';
import { effectsListElement, onEffectsListElementChange, scaleElement, onScaleElementClick } from './edit-image.js';

// $======================== UPLOAD IMAGE ========================$ //
// $======================== UPLOAD IMAGE ========================$ //

const uploadImgInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlayElement.querySelector('.img-upload__cancel');

//# обработчик нажатия на крестик
const onCloseButtonClick = () => {
  closeUploadOverlay();
};

//# обработчик нажатия на кнопку ESC
const onDocumentKeydown = (evt) => {
  if (isEscKey(evt) && !checkInputsFocus()) {
    closeUploadOverlay();
  }
};

//@ функция, открывающая форму загрузки и обработки изображения
const openUploadOverlay = () => {
  uploadOverlayElement.classList.remove('hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');

  //# отправка формы
  formElement.addEventListener('submit', onFormSubmit);

  //# настройка размера картинки
  scaleElement.addEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.addEventListener('change', onEffectsListElementChange);
};

//@ функция, закрывающая форму загрузки и обработки изображения
function closeUploadOverlay() {
  uploadOverlayElement.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.classList.remove('modal-open');

  //# отправка формы
  formElement.removeEventListener('submit', onFormSubmit);

  //# настройка размера картинки
  scaleElement.removeEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.removeEventListener('change', onEffectsListElementChange);

  //# сброс значения поля выбора файла
  uploadImgInputElement.value = null;

  //# удаление сообщений-ошибок
  pristine.reset();

}

//# обработчик нажатия на кнопку 'Загрузить фото'
const onUploadImgInputElementChange = () => {
  openUploadOverlay();
};

//# загрузка фото
uploadImgInputElement.addEventListener('change', onUploadImgInputElementChange);


// &------------------------ EXPORT ------------------------& //
export { closeUploadOverlay };
