import { isEscKey, checkInputsFocus } from './util.js';
import { pristine } from './validate-form.js';
import { effectsListElement, onEffectsListElementChange, scaleElement, onScaleElementClick } from './edit-image.js';

// $======================== UPLOAD IMAGE ========================$ //
// $======================== UPLOAD IMAGE ========================$ //

const uploadImgInputElement = document.querySelector('.img-upload__input');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const closeButton = uploadModalElement.querySelector('.img-upload__cancel');

//# обработчик нажатия на кнопку 'Загрузить фото'
const onUploadImgInputElementChange = () => {
  openUploadModal();
};

//# обработчик нажатия на крестик
const onCloseButtonClick = () => {
  closeUploadModal();
};

//# обработчик нажатия на кнопку ESC
const onDocumentKeydown = (evt) => {
  if (isEscKey(evt) && !checkInputsFocus() && !document.querySelector('.error')) {
    closeUploadModal();
  }
};

//@ функция, открывающая форму загрузки и обработки изображения
function openUploadModal() {
  uploadModalElement.classList.remove('hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');

  //# отправка формы
  // formElement.addEventListener('submit', onFormSubmit);

  //# настройка размера картинки
  scaleElement.addEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.addEventListener('change', onEffectsListElementChange);
}

//@ функция, закрывающая форму загрузки и обработки изображения
function closeUploadModal() {
  uploadModalElement.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.classList.remove('modal-open');

  //# отправка формы
  // formElement.removeEventListener('submit', onFormSubmit);

  //# настройка размера картинки
  scaleElement.removeEventListener('click', onScaleElementClick);

  //# настройка фильтров
  effectsListElement.removeEventListener('change', onEffectsListElementChange);

  //# сброс значения поля выбора файла
  uploadImgInputElement.value = null;

  //# удаление сообщений-ошибок
  pristine.reset();

}

//# загрузка фото
uploadImgInputElement.addEventListener('change', onUploadImgInputElementChange);


// &------------------------ EXPORT ------------------------& //
export { openUploadModal, closeUploadModal };
