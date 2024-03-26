import { splitInput } from './util.js';
import { closeUploadOverlay } from './upload-image.js';
import { appendMessage } from './success-and-error-messages.js';

// $======================== VALIDATE FORM ========================$ //
// $======================== VALIDATE FORM ========================$ //

const formElement = document.querySelector('.img-upload__form');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});


// $------------------------ валидация хэштегов ------------------------$ //
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

//@ функция, проверяющая, что хэштег соответствует регулярному выражению
const validateHashtag = (hashtag) => hashtagRegExp.test(hashtag);

//@ функция, проверяющая хэштеги на формат
const validateHashtagsFormat = () => {
  if (hashtagInputElement.value !== '') {
    const isEveryHashtagValid = splitInput(hashtagInputElement).every((hashtagElem) => validateHashtag(hashtagElem));
    return isEveryHashtagValid;
  }
  return true;
};

//@ функция, проверяющая хэштеги на количество
const validateHashtagsAmount = () =>
  hashtagInputElement.value === '' || splitInput(hashtagInputElement).length <= 5;


//@ функция, проверяющая повторы хэштегов
const validateHashtagsDuplicates = () =>
  new Set(splitInput(hashtagInputElement)).size === splitInput(hashtagInputElement).length;


//# валидация формата хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsFormat,
  'хэштег должен начинаться с символа # и быть не более 20 символов'
);

//# валидация количества хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsAmount,
  'количество хэштегов должно быть не более 5'
);
//# валидация повтора хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsDuplicates,
  'хэштеги не должны повторяться'
);


// $------------------------ валидация комментария ------------------------$ //
const commentInputElement = document.querySelector('.text__description');
//@ функция, проверяющая поле комментария на валидность
const validateCommentInput = () => {
  if (commentInputElement.value === '' || commentInputElement.value.length <= 140) {
    return true;
  }
  return false;
};

//# валидация инпута комментария
pristine.addValidator(
  commentInputElement,
  validateCommentInput,
  'комментарий должен быть не более 140 символов'
);


// $------------------------ отправка формы ------------------------$ //


//# обработчик отправки формы
const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // console.log('можно отправлять');
    appendMessage('success');
    closeUploadOverlay();
  } else {
    appendMessage('error');
    // console.log('форма не валидна');
  }
};
/// назначение обработчика в модуле upload-image.js


// &------------------------ EXPORT ------------------------& //
export { formElement, onFormSubmit, pristine };
