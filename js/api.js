import { createMessage } from './success-and-error-messages.js';

//# получение данных для отрисовки миниатюр
const DATA_ERROR_MESSAGE_CLASS = 'data-error';
const ERROR_MESSAGE_SHOW_TIME = 5000;
const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const pictures = await fetch(DATA_URL) //? если адрес неверный, то выводится ошибка в консоль, это норм?
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return response;
  })
  .then((response) => response.json())
  .catch(() => {
    document.body.append(createMessage(DATA_ERROR_MESSAGE_CLASS));
    setTimeout(() => {
      document.body.removeChild(createMessage(DATA_ERROR_MESSAGE_CLASS));
    }, ERROR_MESSAGE_SHOW_TIME);
  });

//# отправка данных на сервер


export { pictures };
