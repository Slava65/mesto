import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationObject } from './constants.js';
import { toggleButtonState } from './utils.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

//Переменные
const popup = document.querySelector('.popup')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_job');
const popupForm = popup.querySelector('.popup__container');
const popupImage = document.querySelector('.popup_image');
const popupPlace = document.querySelector('.popup_place')
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonPlace = popupPlace.querySelector('.popup__close_place');
const popupPlaceForm = popupPlace.querySelector('.popup__container_place');
const elementList = document.querySelector('.element__list');
const placeName = popupPlaceForm.querySelector('.popup__text_place-name');
const placeLink = popupPlaceForm.querySelector('.popup__text_place-link');
const template = document.querySelector('#element');
const popupProfileForm = document.querySelector('.popup__container_profile');


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, template, handleCardClick).getCard();
    cardList.addItem(card)}
  }, '.element__list');

  const handleCardClick = (evt) => {
    new PopupWithImage('.popup_image').open(evt);
  }
  cardList.drowingElement();


new FormValidator(validationObject, popupPlaceForm).enableValidation();
new FormValidator(validationObject, popupProfileForm).enableValidation();


const popupProfileObject = new PopupWithForm('.popup_profile', () => {
  name.textContent = nameInput.textContent;
  job.textContent = jobInput.textContent;
});

const popupPlaceObject = new PopupWithForm('.popup_place', () => {
  const newElement = PopupWithForm._getInputValues();
  const newCard = new Card(newElement, template, handleCardClick).getCard();
  cardList.addItem(newCard);
});

popupEditButton.addEventListener('click', () => {
  popupProfileObject.open();
  nameInput.textContent = name.textContent;
  jobInput.textContent = job.textContent;
});

popupAddButton.addEventListener('click', () => {
  popupPlaceObject.open();
});


//Функция закрытия попапа кликом по оверлей
// const popupList = Array.from(document.querySelectorAll('.popup'));
// popupList.forEach((popupElement) => {
//    popupElement.addEventListener('click', evt => {
//       if (evt.target === evt.currentTarget) {
//         openPopup(popupElement);
//       }
//     })
// })



