import { showLoadingDataError, showUploadingDataError } from './alerts.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, showError, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(showError());
    });

export const getData = () => load(Route.GET_DATA, showLoadingDataError);

export const sendData = (body) => load(Route.SEND_DATA, showUploadingDataError, Method.POST, body);
