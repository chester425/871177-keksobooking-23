const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adTitle = adForm.querySelector('#title');
const adTitleMinLength = adTitle.getAttribute('minlength');
const adTitleMaxLength = adTitle.getAttribute('maxlength');
const adPriceOneNigth = adForm.querySelector('#price');
const adAddress = adForm.querySelector('#address');
const fildsetForm = adForm.querySelectorAll('fieldset');
const roomsNumber = adForm.querySelector('#room_number');
const roomsValue = roomsNumber.querySelectorAll('option');
const guestsNumber = adForm.querySelector('#capacity');
const guestsValue = guestsNumber.querySelectorAll('option');
const noGuests = guestsNumber.children[3];
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const selectFiltersMap = mapFilters.querySelectorAll('select');
const selectFiltersFeatures = mapFilters.querySelectorAll('fieldset');

// Добавление адреса центра карты
const setAdAddress = (value) => {
  adAddress.value = `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}`;
};

// Добавление класса и атрибута disabled
const addClass = () => {
  adForm.classList.add('ad-form--disabled');
};

const appendDisabled = (value) => {
  value.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// Удаления класса и атрибута disabled
const deletClass = () => {
  adForm.classList.remove('ad-form--disabled');
};

const deleteDisabled = (value) => {
  value.forEach((element) => {
    element.removeAttribute('disabled');
  });
};


// перевод страницы в неактивное состояние
const inactiveСondition = () => {
  appendDisabled(fildsetForm);
  appendDisabled(selectFiltersMap);
  appendDisabled(selectFiltersFeatures);
  addClass();
};

// перевод страницы в активное состояние
const activeСondition = () => {
  deleteDisabled(fildsetForm);
  deleteDisabled(selectFiltersMap);
  deleteDisabled(selectFiltersFeatures);
  deletClass();
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
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

export {setAdAddress, inactiveСondition, activeСondition};
