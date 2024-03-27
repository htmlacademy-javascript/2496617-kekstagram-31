import { showSuccessMessage, showDataErrorMessage } from './success-and-error-messages.js';

// $======================== GET AND SEND DATA ========================$ //
// $======================== GET AND SEND DATA ========================$ //

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

//@ функция, получающая данные с сервера
const getData = (
  // onSuccess //? эта функция не работает, как ожидается по показанному в скринкасте
) => {
  const data = fetch(`${BASE_URL}${ROUTE.GET_DATA}`) //? если адрес неверный, то выводится ошибка в консоль, это норм?
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json())
    // .then((dataPictures) => {
    //   onSuccess(dataPictures);
    // }) //? вот тут, возвращает undefined
    .catch(() => {
      showDataErrorMessage();
    });
  return data;
};

//# присвоение данных в переменную
const pictures = await getData();

//@ функция, отправляющая данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}${ROUTE.GET_DATA}`, //? если адрес неверный, то выводится ошибка в консоль, это норм?
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessMessage();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      } //? если без блока else, то всегда идёт в catch, и появляется сообщение об ошибке
    })
    .catch(() => {
      onFail();
    });
};


export { pictures, sendData };
