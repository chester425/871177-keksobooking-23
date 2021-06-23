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

export { NUMBER_ADS, TYPE_OF_HOUSE, CHECKIN_TIMES, CHECKOUT_TIMES, OPTIONS, PHOTOS, LocationLat, LocationLng, Price, Rooms, Guests};
