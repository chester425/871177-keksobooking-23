import {resetButtonElement} from './map.js';

const ESC_KEY = 27;

const popupSuccessElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const popupErrorElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const popupSuccess = popupSuccessElement.cloneNode(true);
const popupError = popupErrorElement.cloneNode(true);

const documentKeydownHandler = (evt) => {
  if (evt.keyCode === ESC_KEY) {
    popupSuccess.remove();
    popupError.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const addPopupEscClose = () => {
  document.addEventListener('keydown', documentKeydownHandler);
};

const showPopupError = () => {
  document.body.append(popupError);
  const errorButtonElement = document.querySelector('.error__button');
  popupError.addEventListener('click', () =>{
    popupError.remove();
  });
  errorButtonElement.addEventListener('click', () =>{
    popupError.remove();
  });
  addPopupEscClose();
};

const showPopupSuccess = () => {
  document.body.append(popupSuccess);
  popupSuccess.addEventListener('click', () =>{
    popupSuccess.remove();
    resetButtonElement.click();
  });
  addPopupEscClose();
  resetButtonElement.click();
};

export {showPopupSuccess, showPopupError};
