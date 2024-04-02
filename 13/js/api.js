import { showSuccessMessage, showDataErrorMessage } from './success-and-error-messages.js';

// $======================== GET AND SEND DATA ========================$ //
// $======================== GET AND SEND DATA ========================$ //

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

//@ функция, получающая данные с сервера
const getData = () => {
  const data = fetch(`${BASE_URL}${ROUTE.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json())
    .catch(() => {
      showDataErrorMessage();
    });
  return data;
};

//# присвоение данных в переменную
const pictures = await getData();

//@ функция, отправляющая данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}${ROUTE.SEND_DATA}`,
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
      }
    })
    .catch(() => {
      onFail();
    });
};

// &------------------------ EXPORT ------------------------& //
export { pictures, sendData };
