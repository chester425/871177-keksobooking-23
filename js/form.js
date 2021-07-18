const adForm = document.querySelector('.ad-form');

const adTitle = adForm.querySelector('#title');
const adTitleMinLength = adTitle.getAttribute('minlength');
const adTitleMaxLength = adTitle.getAttribute('maxlength');

const adPriceOneNigth = adForm.querySelector('#price');

// перевод страницы в неактивное состояние
const renderForm = () =>{
  const mapFilters = document.querySelector('.map__filters');
  const fildsetForm = adForm.querySelectorAll('fieldset');
  const selectFiltersMap = mapFilters.querySelectorAll('select');
  const selectFiltersFeatures = mapFilters.querySelectorAll('fieldset');

  const addClass = () => {
    adForm.classList.add('ad-form--disabled');
  };

  const appendDisabled = (value) => {
    value.forEach((element) => {
      element.setAttribute('disabled', 'disabled');
    });
  };


  const deleteDisabled = (value) => {
    value.forEach((element) => {
      element.removeAttribute('disabled');
    });
  };

  appendDisabled(fildsetForm);
  appendDisabled(selectFiltersMap);
  appendDisabled(selectFiltersFeatures);
  addClass();

  deleteDisabled(fildsetForm);
};

// валидация формы
adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < adTitleMinLength) {
    adTitle.setCustomValidity(`Добавьте еще ${adTitleMinLength - valueLength} символов`);
  } else if (valueLength > adTitleMaxLength) {
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - adTitleMaxLength} символы`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

// Цена за ночь
adPriceOneNigth.addEventListener('input', () => {
  const valueLength = adPriceOneNigth.value;
  if (Number(valueLength) > Number(adPriceOneNigth.max)) {
    adPriceOneNigth.setCustomValidity('Цена не более 1000000');
  }else {
    adPriceOneNigth.setCustomValidity('');
  }

  adPriceOneNigth.reportValidity();
});


const roomsNumber = document.querySelector('#room_number');
const roomsValue = roomsNumber.querySelectorAll('option');
const guestsNumber = document.querySelector('#capacity');
const guestsValue = guestsNumber.querySelectorAll('option');
const noGuests = guestsNumber.children[3];

// связанный список комнат и гостей
roomsNumber.addEventListener('change', () => {
  const currentValueRooms = roomsNumber.value;
  guestsNumber.value = currentValueRooms;
  if (currentValueRooms === '100') {
    guestsValue.forEach((element) => {
      element.disabled = true;
      if (element.value === '0'){
        element.selected = true;
      }
    });
  }else {
    guestsValue.forEach((element) => {
      if (element.value <= currentValueRooms){
        element.disabled = false;
        noGuests.disabled = true;
      }else{
        element.disabled = true;
      }
    });
  }
  roomsNumber.setCustomValidity('Выберете другое количество комнат');
});

// связанный список гостей и комнат
guestsNumber.addEventListener('change', () => {
  const currentValueGuests = guestsNumber.value;
  const currentValueRooms = roomsNumber.value;
  if (currentValueGuests === '0') {
    guestsValue.forEach((element) => {
      element.disabled = true;
    });
    roomsValue.forEach((element) => {
      if (element.value === '100'){
        element.selected = true;
        roomsNumber.setCustomValidity('Выберете другое количество комнат');
      }
    });
  }else {
    guestsValue.forEach((element) => {
      if (element.value <= currentValueRooms){
        element.disabled = false;
        noGuests.disabled = true;
      }else{
        element.disabled = true;
      }
    });
  }
  guestsNumber.setCustomValidity('Выберете другое количество гостей');
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
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

export {renderForm};
