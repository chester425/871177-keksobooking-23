import {getAds} from './ads.js';
const cards = getAds();

const similarPopupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const getPopupPhotos = (container, photos) => {
  const popupPhotosElement = container.querySelector('.popup__photos');
  const popupPhotoElement = popupPhotosElement.querySelector('.popup__photo');
  if (photos.length === 0) {
    popupPhotoElement.style.display = 'none';
  } else {
    photos.forEach((photo, i) => {
      if (i === 0) {
        popupPhotoElement.src = photo;
      } else {
        const cloneImage = popupPhotoElement.cloneNode(true);
        cloneImage.src = photo;
        popupPhotosElement.appendChild(cloneImage);
      }
    });
  }
};

const renderFeatureElements = (features, elements) => {
  const popupFeaturesList = features.map((feature) => `popup__feature--${feature}`);
  elements.forEach((element) => {
    let popupClass = false;
    popupFeaturesList.forEach((modifierItem) => {
      if (element.classList.contains(modifierItem)){
        popupClass = true;
      }
    });
    if (!popupClass) {
      element.remove();
    }
  });
};

const renderCard = (data) => {
  const renderSimilarCard = similarPopupTemplate.cloneNode(true);

  if(data.author.avatar){
    renderSimilarCard.querySelector('.popup__avatar').src = data.author.avatar;
  }else{
    renderSimilarCard.querySelector('.popup__avatar').classList.add('hidden');
  }

  if(data.offer.address){
    renderSimilarCard.querySelector('.popup__text--address').textContent = data.offer.address;
  }else{
    renderSimilarCard.querySelector('.popup__text--address').classList.add('hidden');
  }

  if(data.offer.price){
    renderSimilarCard.querySelector('.popup__text--price').textContent = `${data.offer.price } ₽/ночь`;
  }else{
    renderSimilarCard.querySelector('.popup__text--price').classList.add('hidden');
  }

  if(data.offer.type){
    renderSimilarCard.querySelector('.popup__type').textContent = data.offer.type;
  }else{
    renderSimilarCard.querySelector('.popup__type').classList.add('hidden');
  }

  if(data.offer.Rooms && data.offer.guests){
    renderSimilarCard.querySelector('.popup__text--capacity').textContent = `${data.offer.Rooms} комнаты для ${data.offer.guests} гостей`;
  }else{
    renderSimilarCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if(data.offer.checkin && data.offer.checkout){
    renderSimilarCard.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }else{
    renderSimilarCard.querySelector('.popup__text--time').classList.add('hidden');
  }

  if(data.offer.description){
    renderSimilarCard.querySelector('.popup__description').textContent = data.offer.description;
  }else{
    renderSimilarCard.querySelector('.popup__description').classList.add('hidden');
  }

  getPopupPhotos(renderSimilarCard,data.offer.photos);

  if (data.offer && data.offer.features) {
    const popupFeatureElement = renderSimilarCard.querySelectorAll('.popup__feature');
    renderFeatureElements(data.offer.features, popupFeatureElement);
  } else {
    renderSimilarCard.querySelector('.popup__features').remove();
  }

  mapCanvas.appendChild(renderSimilarCard);
};

const renderCards = () =>{
  cards.forEach((card) => renderCard(card));
};

export {renderCards, renderCard};
