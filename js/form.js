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

// связанный список
const roomsNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const guestsValue = guestsNumber.querySelectorAll('option');
const noGuests = guestsNumber.children[3];

roomsNumber.addEventListener('change', () => {
  const currentValueRooms = roomsNumber.value;
  if (currentValueRooms === '100') {
    guestsValue.forEach((element) => {
      element.disabled = true;
      if (element.value === '0'){
        element.selected = true;
      }
      guestsNumber.value = currentValueRooms;
      element.selected = true;
    });

  }else {
    guestsValue.forEach((element) => {
      if (element.value <= currentValueRooms){
        element.disabled = false;
        noGuests.disabled = true;
      }else{
        element.disabled = true;
      }
      guestsNumber.value = currentValueRooms;
    });
  }
  roomsNumber.setCustomValidity('Выберете другое количество комнат');
});


export {renderForm};
