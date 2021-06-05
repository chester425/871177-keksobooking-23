// получение случайного целого числа
const getRandomInt = (min, max) =>  {
  if(max < min){
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(0, 100);

// получение случайного числа с плавающей точкой
const getRandomFloat = (min, max, digits) => {
  if(max < min){
    return;
  }
  max = Math.floor(max);
  return Math.random().toFixed(digits) * (max - min ) + min;
};

getRandomFloat(0, 100, 2);
