import { splitInput } from './util.js';
import { createMessage } from './success-and-error-messages.js';

// $======================== VALIDATE FORM ========================$ //
// $======================== VALIDATE FORM ========================$ //
const SUCCESS_MESSAGE_CLASS = 'success';
const ERROR_MESSAGE_CLASS = 'error';

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

const SEND_DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
/// в параметр onSuccess будет передаваться функция closeUploadModal
const setUploadFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(SEND_DATA_URL,
        {
          method: 'POST',
          body: formData,
        })
        .then((response) => {
          if (response.ok) {
            onSuccess();
            document.body.append(createMessage(SUCCESS_MESSAGE_CLASS));
            /// именно создание каждый раз сообщения нужно, чтобы можно было удалить обработчик с document
          } else {
            throw new Error(`${response.status} - ${response.statusText}`);
          } //? если без блока else, то всегда идёт в catch, и появляется сообщение об ошибке
        })
        .catch(() => {
          document.body.append(createMessage(ERROR_MESSAGE_CLASS));
        });
    }
  });
  //? обработчик не удалить, раз у функции есть параметр?
};


// &------------------------ EXPORT ------------------------& //
export { pristine, setUploadFormSubmit };
