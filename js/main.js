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
  return (Math.random() * (max - min ) + min).toFixed(digits);
};

getRandomFloat(0, 100, 2);


const NUMBER_ADS = 10;
const TYPE_OF_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const LocationLat = {
  MIN: 35.65000,
  MAX:35.70000,
};

const LocationLng = {
  MIN: 139.70000,
  MAX:139.80000,
};

const Price = {
  MIN: 1000,
  MAX: 10000,
};

const Rooms = {
  MIN: 1,
  MAX: 5,
};

const Guests = {
  MIN: 1,
  MAX: 6,
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getAds = () => {
  const adsArray = [];
  for (let i = 1; i <= NUMBER_ADS; i++) {
    const LAT = getRandomFloat(LocationLat.MIN, LocationLat.MAX, 5);
    const LNG = getRandomFloat(LocationLng.MIN, LocationLng.MAX, 5);
    i = i.toString().padStart(2, '0');

    const ad = {
      author: {
        avatar: `img/avatars/user${  i  }.png`, // адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },

      offer: {  //объект — содержит информацию об объявлении. Состоит из полей:
        title: 'Крутая хата', //строка — заголовок предложения. Придумайте самостоятельно.
        address: `${LAT  }, ${  LNG}` , //строка — адрес предложения. Для простоты пусть пока  составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
        price: getRandomInt(Price.MIN,Price.MAX), //число — стоимость. Случайное целое положительное число.
        type: getRandomArrayElement(TYPE_OF_HOUSE), //строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
        Rooms: getRandomInt(Rooms.MIN,Rooms.MAX), //число — количество комнат. Случайное целое положительное число.
        guests: getRandomInt(Guests.MIN,Guests.MAX), //число — количество гостей, которое можно разместить. Случайное целое положительное число.
        checkin: getRandomArrayElement(CHECKIN_TIMES), //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
        checkout: getRandomArrayElement(CHECKOUT_TIMES), //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
        features: OPTIONS.slice(getRandomInt (0, OPTIONS.length)) , //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
        description: 'Великолепная квартира полностью укомплектована и недавно отремонтирована.', //строка — описание помещения. Придумайте самостоятельно.
        photos: PHOTOS.slice(getRandomInt (0, PHOTOS.length)), //массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
      },

      location: {
        lat: Number(LAT), // координата x широта.
        lng: Number(LNG), // координата y метки на карте .
      },

    };
    adsArray.push(ad);
  }
  return adsArray;
};

getAds();
