import {setAdAddress, activeСondition, adFormElement} from './form.js';
import {getData} from './fetch.js';
import {renderCard} from './render-card.js';

const resetButtonElement = document.querySelector('.ad-form__reset');
const DATA_COUNT = 10;
const ZOOM_MAP = 10;

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

// карта
const installingMap = () =>{

  const map = L.map('map-canvas')
    .on('load', () => {
      activeСondition();
    })

    .setView(CENTER_MAP, ZOOM_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon(MAIN_ICON_MAP);

  const mainPinMarker = L.marker(CENTER_MAP,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  // данные с сервера
  getData((data) => {
    const renderData = data.slice(0, DATA_COUNT);

    renderData.forEach((element) => {
      const icon = L.icon(ICON_MAP);

      const marker = L.marker(element.location,
        {
          icon,
        },
      );

      marker
        .addTo(map)
        .bindPopup(renderCard(element),
          {
            keepInView: true,
          },
        );
    });
  });

  // Центр Токио
  setAdAddress(CENTER_MAP);

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
};

export {CENTER_MAP, installingMap};
