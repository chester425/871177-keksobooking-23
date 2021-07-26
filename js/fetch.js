import {showAlert} from './utils.js';

const FETCH_URL = 'https://23.javascript.pages.academy/keksobooking';
const getData = (onSuccess, onFail) => {
  fetch(`${FETCH_URL}/data`)
    .then((response) => {
      if(response.ok){
        response.json()
          .then((data) => {
            onSuccess(data);
          });
      }else{
        onFail(showAlert('Загрузка не удалась.Попробуйте еще раз.'));
      }
    });
};

const sendData = (onSuccess, onError, bodyData) => {
  fetch(FETCH_URL, {
    method: 'POST',
    body: bodyData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => { onError(); });
};
export {getData, sendData};
