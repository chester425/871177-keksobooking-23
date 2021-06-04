// получение случайного целого числа
const getRandomInt = (min, max) =>  {
  if(max < min){
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(0, 100);

// получение случайного числа с плавающей точкой
const getRandomNotInt = (min, max) => {
  if(max < min){
    return;
  }
  max = Math.floor(max);
  return Math.random().toFixed(1) * (max - min ) + min;
};

getRandomNotInt(0, 100);
