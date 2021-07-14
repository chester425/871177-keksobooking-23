
const renderForm = () =>{
  const adForm = document.querySelector('.ad-form');
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

export {renderForm};
