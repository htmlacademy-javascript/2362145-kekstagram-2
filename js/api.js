import { showAlert } from './utils.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const METHODS = {
  GET: 'GET',
  POST: 'POST'
};

const loadingData = (route, method = METHODS.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    });

const getData = (onSuccess) =>
  loadingData(ROUTE.GET_DATA)
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('data-error');
    });

const sendData = (body) =>
  loadingData(ROUTE.SEND_DATA, METHODS.POST, body)
    .then(() => {
      showAlert('success');
    })
    .catch((error) => {
      showAlert('error');
      return Promise.reject(error);
    });

export { getData, sendData };
