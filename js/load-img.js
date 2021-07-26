const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_HOUSING_WIDTH = '70';
const PHOTO_HOUSING_HEIGHT = '70';
const PHOTO_HOUSING_TEXT = 'Фото жилья';

const userAvatarElement = document.querySelector('#avatar');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const photoContainerElement = document.querySelector('.ad-form__photo-container');
const photoHousingElement = photoContainerElement.querySelector('#images');
const photoTemplateElement = photoContainerElement.querySelector('.ad-form__photo');

const uploadingPhoto = (loadingElement, insertElement) => {
  loadingElement.addEventListener('change', () => {
    const filePhoto = loadingElement.files[0];
    const fileNamePhoto = filePhoto.name.toLowerCase();
    const matchesElement = FILE_TYPES.some((element) => fileNamePhoto.endsWith(element));
    if (matchesElement) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        insertElement.src = reader.result;
      });
      reader.readAsDataURL(filePhoto);
    }
  });
};

const createPhotoHousing = () => {
  const photoElement = document.createElement('img');
  photoElement.setAttribute('alt', PHOTO_HOUSING_TEXT);
  photoElement.setAttribute('width', PHOTO_HOUSING_WIDTH);
  photoElement.setAttribute('height', PHOTO_HOUSING_HEIGHT);
  photoElement.setAttribute('src', '');

  photoTemplateElement.appendChild(photoElement);
};
createPhotoHousing();
const previewHousingElement = photoTemplateElement.querySelector('img');

uploadingPhoto(userAvatarElement, previewAvatarElement);
uploadingPhoto(photoHousingElement, previewHousingElement);
