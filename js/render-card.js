import {getAds} from './ads.js';
import {PHOTOS} from './variables.js';

const getCards = getAds();
const similarPopupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const mapConvas = document.querySelector('#map-canvas');
const popupPhotos = similarPopupTemplate.querySelector('.popup__photos');
const popupPhoto = popupPhotos.querySelector('.popup__photo');


const getPopupPhotos = (photos) => {
  if (photos.length === 0) {
    popupPhoto.style.display = 'none';
  } else {
    for (let i = 0; i < photos.length; i++) {
      if (i === 0) {
        popupPhoto.src = photos[i];
      } else {
        const cloneImage = popupPhoto.cloneNode(true);
        cloneImage.src = photos[i];
        popupPhotos.appendChild(cloneImage);
      }
    }
  }
};

// getPopupPhotos(PHOTOS);


const getSimilarCard = () =>{
  getCards.forEach((data) => {
    const renderSimilarCard = similarPopupTemplate.cloneNode(true);
    renderSimilarCard.querySelector('.popup__title').textContent = data.offer.title;
    renderSimilarCard.querySelector('.popup__text--address').textContent = data.offer.address;
    renderSimilarCard.querySelector('.popup__text--price').textContent = `${data.offer.price } ₽/ночь`;
    renderSimilarCard.querySelector('.popup__type').textContent = data.offer.type;
    renderSimilarCard.querySelector('.popup__text--capacity').textContent = `${data.offer.Rooms  } комнаты для ${data.offer.guests} гостей`;
    renderSimilarCard.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
    renderSimilarCard.querySelector('.popup__description').textContent = data.offer.description;
    getPopupPhotos(data.offer.photos);

    const getFeatures = renderSimilarCard.querySelectorAll('.popup__feature');
    const modi = data.offer.features.map((feature) => `popup__feature--${feature}`);
    getFeatures.forEach((item) => {
      const qwe = item.classList[1];
      if(!modi.includes(qwe)){
        item.remove();
      }
    });

    mapConvas.appendChild(renderSimilarCard);
  });
};

export {getSimilarCard};
