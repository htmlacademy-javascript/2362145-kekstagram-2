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
      } else {
        showAlert('data-error');
      }
    })
    .then((response) => {
      onSuccess(response);
    });
};

const sendData = (body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        console.log('отправлено успешно');
      } else {
        showAlert('error');
        console.log('не отправлено');
      }
    })
    .catch(() => {
      showAlert('error');
    });
};

export { getData, sendData };
