import { splitInput } from './util.js';
import { sendData } from './api.js';
import { showErrorMessage } from './success-and-error-messages.js';

// $======================== UPLOAD FORM ========================$ //
// $======================== UPLOAD FORM ========================$ //

const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAG_INVALID_FORMAT_MESSAGE = 'хэштег должен начинаться с символа # и быть не более 20 символов';
const HASHTAGS_INVALID_AMOUNT_MESSAGE = 'количество хэштегов должно быть не более 5';
const HASHTAGS_DUPLICATES_MESSAGE = 'хэштеги не должны повторяться';
const COMMENT_INVALID_LENGTH_MESSAGE = 'комментарий должен быть не более 140 символов';

const SUBMIT_BUTTON_SENDING_TEXT = 'Отправляю...';
const SUBMIT_BUTTON_DEFAULT_TEXT = 'Опубликовать';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
    return splitInput(hashtagInputElement).every((hashtagElem) => validateHashtag(hashtagElem));
  }
  return true;
};

//@ функция, проверяющая хэштеги на количество
const validateHashtagsAmount = () =>
  hashtagInputElement.value === '' || splitInput(hashtagInputElement).length <= HASHTAGS_MAX_AMOUNT;


//@ функция, проверяющая повторы хэштегов
const validateHashtagsDuplicates = () =>
  new Set(splitInput(hashtagInputElement)).size === splitInput(hashtagInputElement).length;


//# валидация формата хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsFormat,
  HASHTAG_INVALID_FORMAT_MESSAGE
);

//# валидация количества хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsAmount,
  HASHTAGS_INVALID_AMOUNT_MESSAGE
);
//# валидация повтора хэштегов
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsDuplicates,
  HASHTAGS_DUPLICATES_MESSAGE
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
  COMMENT_INVALID_LENGTH_MESSAGE
);

// $------------------------ блокировка кнопки "отправить" ------------------------$ //
const submitButton = formElement.querySelector('.img-upload__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SUBMIT_BUTTON_SENDING_TEXT;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SUBMIT_BUTTON_DEFAULT_TEXT;
};

// $------------------------ загрузка фотографии ------------------------$ //
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isAcceptableType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isAcceptableType) {
    preview.src = URL.createObjectURL(file);

    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${preview.src}')`;
    });
  }
});

// $------------------------ отправка формы ------------------------$ //
/// в параметр onSuccess будет передаваться функция closeUploadModal
const setUploadFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};


// &------------------------ EXPORT ------------------------& //
export { pristine, setUploadFormSubmit, formElement };
