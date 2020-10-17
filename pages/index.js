import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/constants.js';
import { validationObject } from '../scripts/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { openPopup } from '../scripts/utils.js';

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
const profileObject = {name: '.profile__name', info: '.profile__job'};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, template, handleCardClick).getCard();
    cardList.addItem(card)}
}, '.element__list');

const handleCardClick = (evt) => {
    const popupImageObject = new PopupWithImage('.popup_image');
    popupImageObject.open(evt);
    popupImageObject.setEventListeners();
}

cardList.drowingElement();

new FormValidator(validationObject, popupPlaceForm).enableValidation();
new FormValidator(validationObject, popupProfileForm).enableValidation();

const userInfo = new UserInfo(profileObject);

const popupProfileObject = new PopupWithForm('.popup_profile', () => {
  const newProfile = popupProfileObject._getInputValues();
  userInfo.setUserInfo(newProfile);
  popupProfileObject.close();
});

popupProfileObject.setEventListeners();

const popupPlaceObject = new PopupWithForm('.popup_place', (element) => {
  const newCard = new Card(element, template, handleCardClick).getCard();
  cardList.addItem(newCard);
  popupPlaceObject.close();
});

popupPlaceObject.setEventListeners();

popupEditButton.addEventListener('click', () => {
  popupProfileObject.open();
  const profileValue = userInfo.getUserInfo();
  nameInput.value = profileValue.name;
  jobInput.value = profileValue.info;
});

popupAddButton.addEventListener('click', () => {
  popupPlaceObject.open();
});

// Функция закрытия попапа кликом по оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      openPopup(popupElement);
    }
  })
})



