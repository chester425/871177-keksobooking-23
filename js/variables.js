const DECIMAL_POINT = 5;
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const TYPE_OF_HOUSE = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
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

export {TYPE_OF_HOUSE, CHECKIN_TIMES, CHECKOUT_TIMES, OPTIONS, DECIMAL_POINT, Price, Rooms, Guests};
