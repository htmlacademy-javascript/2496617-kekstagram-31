import { appendMessage, removeMessage } from './success-and-error-messages.js';

//# получение данных для отрисовки миниатюр
const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const pictures = await fetch(DATA_URL) //? если адрес неверный, то выводится ошибка в консоль, это норм?
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then((response) => response.json())
  .catch(() => {
    appendMessage('data-error');
    setTimeout(() => {
      removeMessage(('.data-error'));
    }, 5000);
  });

export { pictures };
