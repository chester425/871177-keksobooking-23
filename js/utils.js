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

export {getRandomInt, getRandomFloat, getRandomArrayElement};
