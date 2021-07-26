import {setAdAddress, activeСondition, adFormElement} from './form.js';
import {getData} from './fetch.js';
import {renderCard} from './render-card.js';
import { debounce } from './utils/debounce.js';

const resetButtonElement = document.querySelector('.ad-form__reset');
const mapFilterElement = document.querySelector('.map__filters');
const housingTypeFilterElement = mapFilterElement.querySelector('#housing-type');
const housingPriceFilterElement = mapFilterElement.querySelector('#housing-price');
const housingRoomsFilterElement = mapFilterElement.querySelector('#housing-rooms');
const housingGuestsFilterElement = mapFilterElement.querySelector('#housing-guests');

const DATA_COUNT = 10;
const ZOOM_MAP = 12;
const ANY_VALUE = 'any';

const CENTER_MAP = {
  lat: 35.68950,
  lng: 139.69200,
};

const MAIN_ICON_MAP = {
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const ICON_MAP = {
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const PRICE_FILTER_LIMIT = {
  LOW: {
    VALUE: 'low',
    MAX: 10000,
  },
  MIDDLE: {
    VALUE: 'middle',
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    VALUE: 'high',
    MIN: 50000,
  },
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const icon = L.icon(ICON_MAP);
const mainPinIcon = L.icon(MAIN_ICON_MAP);
const mainPinMarker = L.marker(CENTER_MAP,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// карта
const installingMap = () =>{
  map.on('load', () => {
    activeСondition();
  })
    .setView(CENTER_MAP, ZOOM_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);
  mainPinMarker.addTo(map);
  setAdAddress(CENTER_MAP);
};

// метка адреса на карте
const createMarker = (point) => {
  const {lat, lng} = point.location;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      renderCard(point),
      {
        keepInView: true,
      },
    );
};

const changePriceFilter = (elementValue, filterValue) => {
  if (filterValue === PRICE_FILTER_LIMIT.LOW.VALUE){
    return elementValue < PRICE_FILTER_LIMIT.LOW.MAX;
  }else if (filterValue === PRICE_FILTER_LIMIT.MIDDLE.VALUE){
    return elementValue >= PRICE_FILTER_LIMIT.MIDDLE.MIN && elementValue < PRICE_FILTER_LIMIT.MIDDLE.MAX;
  }else if (filterValue === PRICE_FILTER_LIMIT.HIGH.VALUE){
    return elementValue >= PRICE_FILTER_LIMIT.HIGH.MIN;
  }else{
    return true;
  }
};

const getMapFeaturesRank = (data) =>{
  const mapCheckboxFeaturesElement = mapFilterElement.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  mapCheckboxFeaturesElement.forEach((feature) => {
    if (data.offer.features){
      if (data.offer.features.includes(feature.value)) {
        rank += 2;
      }
    }
  });
  return rank;
};

const compareRank = (dataA, dataB) =>{
  const offerRankA = getMapFeaturesRank(dataA);
  const offerRankB = getMapFeaturesRank(dataB);
  return offerRankB - offerRankA;
};

// Любые первые объявления
const renderStartData = (data) =>{
  data.slice(0, DATA_COUNT).forEach((point) => {
    createMarker(point);
  });
};

// Применение фильтра
const changeFilterItem = (elementValue, filterValue) =>
  filterValue === ANY_VALUE || String(filterValue) === String(elementValue);

const changeFilterElement = (element) => (
  changeFilterItem(element.offer.type, housingTypeFilterElement.value) &&
  changePriceFilter(element.offer.price, housingPriceFilterElement.value) &&
  changeFilterItem(element.offer.rooms, housingRoomsFilterElement.value) &&
  changeFilterItem(element.offer.guests, housingGuestsFilterElement.value)
);

// фильтрованные данные
const filterTypeElement = (data) => data.filter(changeFilterElement);

// старт отображения объявлений
getData((data) => renderStartData(data));

// рендер карты при помощи фильтра
mapFilterElement.addEventListener('change',debounce(() => {
  getData((data) => {
    markerGroup.clearLayers();
    filterTypeElement(data)
      .sort(compareRank)
      .slice(0, DATA_COUNT)
      .forEach((point) => {
        createMarker(point);
      });
  });
}));

// Изменение адреса
mainPinMarker.on('moveend', (evt) => {
  setAdAddress(evt.target.getLatLng());
});

// Сброс всех значений
const resetFormHendler = (evt) => {
  evt.preventDefault();
  adFormElement.reset();
  mainPinMarker.setLatLng(CENTER_MAP);
  setAdAddress(CENTER_MAP);
  map.setView(CENTER_MAP, ZOOM_MAP);
};

resetButtonElement.addEventListener('click', resetFormHendler);

export {CENTER_MAP, installingMap, resetButtonElement};
