const ALERT_SHOW_TIME = 5000;

// получение случайного целого числа
const getRandomInt = (min, max) =>  {
  if(max < min){
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// получение случайного числа с плавающей точкой
const getRandomFloat = (min, max, digits) => {
  if(max < min){
    return;
  }
  max = Math.floor(max);
  return (Math.random() * (max - min ) + min).toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 400;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '400px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, getRandomFloat, getRandomArrayElement, showAlert};
