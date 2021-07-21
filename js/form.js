import {DECIMAL_POINT} from './variables.js';
import {sendData} from './fetch.js';
import {showAlert} from './utils.js';
import {showPopupSuccess} from './popup.js';

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adTitleElement = adFormElement.querySelector('#title');
const adTitleMinLengthElement = adTitleElement.getAttribute('minlength');
const adTitleMaxLengthElement = adTitleElement.getAttribute('maxlength');
const adPriceOneNigthElement = adFormElement.querySelector('#price');
const adAddressElement = adFormElement.querySelector('#address');
const fildsetFormElement = adFormElement.querySelectorAll('fieldset');
const roomsNumberElement = adFormElement.querySelector('#room_number');
const roomsValueElement = roomsNumberElement.querySelectorAll('option');
const guestsNumberElement = adFormElement.querySelector('#capacity');
const guestsValueElement = guestsNumberElement.querySelectorAll('option');
// const adSubmitElement =  adFormElement.querySelector('.ad-form__submit');
const noGuestsElement = guestsNumberElement.children[3];
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const selectFiltersMapElement = mapFiltersElement.querySelectorAll('select');
const selectFiltersFeaturesElement = mapFiltersElement.querySelectorAll('fieldset');

// Добавление адреса центра карты
const setAdAddress = (value) => {
  adAddressElement.value = `${value.lat.toFixed(DECIMAL_POINT)}, ${value.lng.toFixed(DECIMAL_POINT)}`;
};

// Добавление класса и атрибута disabled
const addClass = () => {
  adFormElement.classList.add('ad-form--disabled');
};

const appendDisabled = (value) => {
  value.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// Удаления класса и атрибута disabled
const deletClass = () => {
  adFormElement.classList.remove('ad-form--disabled');
};

const deleteDisabled = (value) => {
  value.forEach((element) => {
    element.removeAttribute('disabled');
  });
};


// перевод страницы в неактивное состояние
const inactiveСondition = () => {
  appendDisabled(fildsetFormElement);
  appendDisabled(selectFiltersMapElement);
  appendDisabled(selectFiltersFeaturesElement);
  addClass();
};

// перевод страницы в активное состояние
const activeСondition = () => {
  deleteDisabled(fildsetFormElement);
  deleteDisabled(selectFiltersMapElement);
  deleteDisabled(selectFiltersFeaturesElement);
  deletClass();
};

// валидация формы
adTitleElement.addEventListener('input', () => {
  const valueLength = adTitleElement.value.length;

  if (valueLength < adTitleMinLengthElement) {
    adTitleElement.setCustomValidity(`Добавьте еще ${adTitleMinLengthElement - valueLength} символов`);
  } else if (valueLength > adTitleMaxLengthElement) {
    adTitleElement.setCustomValidity(`Удалите лишние ${valueLength - adTitleMaxLengthElement} символы`);
  } else {
    adTitleElement.setCustomValidity('');
  }

  adTitleElement.reportValidity();
});

// Цена за ночь
adPriceOneNigthElement.addEventListener('input', () => {
  const valueLength = adPriceOneNigthElement.value;
  if (Number(valueLength) > Number(adPriceOneNigthElement.max)) {
    adPriceOneNigthElement.setCustomValidity('Цена не более 1000000');
  }else {
    adPriceOneNigthElement.setCustomValidity('');
  }
  adPriceOneNigthElement.reportValidity();
});

// связанный список комнат и гостей
roomsNumberElement.addEventListener('change', () => {
  const currentValueRooms = roomsNumberElement.value;
  guestsNumberElement.value = currentValueRooms;
  if (currentValueRooms === '100') {

    guestsValueElement.forEach((element) => {
      element.disabled = true;
      element.value === '0';
      element.selected = true;
      roomsNumberElement.setCustomValidity('Выберете другое количество комнат');
    });
  }else {
    guestsValueElement.forEach((element) => {
      if (element.value <= currentValueRooms){
        element.disabled = false;
        noGuestsElement.disabled = true;
        roomsNumberElement.setCustomValidity('');
      }else{
        element.disabled = true;
      }
    });
  }
});

// связанный список гостей и комнат
guestsNumberElement.addEventListener('change', () => {
  const currentValueGuests = guestsNumberElement.value;
  const currentValueRooms = roomsNumberElement.value;
  if (currentValueGuests === '0') {
    guestsValueElement.forEach((element) => {
      element.disabled = true;
      guestsNumberElement.setCustomValidity('Выберете другое количество гостей');
    });
    roomsValueElement.forEach((element) => {
      if (element.value === '100'){
        element.selected = true;
      }
    });
  }else {
    guestsValueElement.forEach((element) => {
      if (element.value <= currentValueRooms){
        element.disabled = false;
        noGuestsElement.disabled = true;
        guestsNumberElement.setCustomValidity('');
      }else{
        element.disabled = true;
      }
    });
  }
});

// тип жилья
const typeOfHousing = document.querySelector('#type');
const priceOneNight = document.querySelector('#price');
priceOneNight.setCustomValidity('Введите сумму');
priceOneNight.reportValidity();

typeOfHousing.addEventListener('change', () => {
  const currentValue = typeOfHousing.value;
  if (currentValue === 'bungalow') {
    priceOneNight.setAttribute('min', '0');
    priceOneNight.placeholder = '0';
  }else if (currentValue === 'flat') {
    priceOneNight.setAttribute('min', '1000');
    priceOneNight.placeholder = '1000';
  } else if (currentValue === 'hotel') {
    priceOneNight.setAttribute('min', '3000');
    priceOneNight.placeholder = '3000';
  } else if (currentValue === 'house') {
    priceOneNight.setAttribute('min', '5000');
    priceOneNight.placeholder = '5000';
  }else if (currentValue === 'palace') {
    priceOneNight.setAttribute('min', '10000');
    priceOneNight.placeholder = '10000';
  }
});

// времяя заезда и выезда
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

// обработчик на отправку

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(showPopupSuccess, showAlert, formData);
});

export {setAdAddress, inactiveСondition, activeСondition, adFormElement};
