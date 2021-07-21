const popupSuccessElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const showPopupSuccess = () => {
  const popupSuccess = popupSuccessElement.cloneNode(true);
  document.body.append(popupSuccess);
  popupSuccess.addEventListener('click', () =>{
    popupSuccess.remove();
  });
};


// const removePopup = (element) => {
//   element.remove();
//   document.removeEventListener('keydown', (evt) => {
//     if (evt.keyCode ===  ESC_KEY) {
//       removePopup(element);
//     }
//   });
//   document.removeEventListener('click', () => {
//     removePopup(element);
//   });
//   if (element.querySelector('.error__button')) {
//     element.querySelector('.error__button').removeEventListener('keydown', () => {
//       removePopup(element);
//     });
//   }
// };
//
// const addPopupEscClose = (element) => {
//   document.addEventListener('keydown', (evt) => {
//     if (evt.keyCode ===  ESC_KEY) {
//       removePopup(element);
//     }
//   });
// };

export {showPopupSuccess};
