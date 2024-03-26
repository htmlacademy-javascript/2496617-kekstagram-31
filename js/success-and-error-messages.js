import { isEscKey } from './util.js';

//@ функция, создающая сообщение об успешной отправке или ошибке
const createMessage = (name) => {
  const messageTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeMessageButton = messageElement.querySelector('button');

  //# обработчик нажатия на кнопку закрытия
  const onCloseMessageButtonClick = () => {
    messageElement.remove();
  };

  //# обработчик нажатия на оверлэй сообщения за пределами блока с сообщением
  const onOverlayMessageClick = (evt) => {
    if (evt.target === messageElement) {
      messageElement.remove();
    }
  };

  //# обработчик нажатия на ESC
  const onDocumentKeydown = (evt) => {
    if (isEscKey(evt)) {
      messageElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);

  if (closeMessageButton) {
    closeMessageButton.addEventListener('click', onCloseMessageButtonClick);
  }

  messageElement.addEventListener('click', onOverlayMessageClick);

  return messageElement;
};

/// обработчики можно не удалять (как я понял), так как удаляются элементы вместе с обработчиками
//! document то не удаляется, нужно удалять его обработчик


// &------------------------ EXPORT ------------------------& //
export { createMessage };
