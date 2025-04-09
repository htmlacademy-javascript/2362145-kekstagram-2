import { showAlert } from './utils.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки данных');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('data-error');
    });
};

const sendData = (body) => fetch(`${BASE_URL}${Route.SEND_DATA}`, {
  method: 'POST',
  body,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }
    return response.json();
  })
  .catch(() => {
    showAlert('error');
    throw new Error('Ошибка отправки данных');
  });

export { getData, sendData };
