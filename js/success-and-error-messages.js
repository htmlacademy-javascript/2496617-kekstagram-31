import { isEscKey } from './util.js';

// $======================== SUCCESS AND ERROR MESSAGES ========================$ //
// $======================== SUCCESS AND ERROR MESSAGES ========================$ //

// const DATA_ERROR_MESSAGE_CLASS = 'data-error';
// const SUCCESS_MESSAGE_CLASS = 'success';
// const ERROR_MESSAGE_CLASS = 'error';

const AlertClass = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-error',
};

const ERROR_MESSAGE_SHOW_TIME = 5000;

//@ функция, создающая сообщение об успешной отправке/ошибке
const createMessage = (name) => {
  const messageTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeMessageButton = messageElement.querySelector('button');

  //# обработчик нажатия на ESC
  const onDocumentKeydown = (evt) => {
    if (isEscKey(evt)) {
      messageElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);

  //# обработчик нажатия на кнопку закрытия
  const onCloseMessageButtonClick = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  //# обработчик нажатия на оверлэй сообщения за пределами блока с сообщением
  const onOverlayMessageClick = (evt) => {
    if (evt.target === messageElement) {
      messageElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  if (closeMessageButton) {
    closeMessageButton.addEventListener('click', onCloseMessageButtonClick);
  }

  messageElement.addEventListener('click', onOverlayMessageClick);

  return messageElement;
};


//@ функция, показывающая сообщение об успешной отправке
const showSuccessMessage = () => {
  document.body.append(createMessage(AlertClass.SUCCESS));
};
//@ функция, показывающая сообщение об ошибке отправки
const showErrorMessage = () => {
  document.body.append(createMessage(AlertClass.ERROR));
};
//@ функция, показывающая сообщение об ошибке получения данных
const showDataErrorMessage = () => {
  const dataErrorMessage = createMessage(AlertClass.DATA_ERROR);
  document.body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

// &------------------------ EXPORT ------------------------& //
export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
