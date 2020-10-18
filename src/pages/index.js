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
const popupEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_job');
const popupPlace = document.querySelector('.popup_place')
const popupAddButton = document.querySelector('.profile__add-button');
const popupPlaceForm = popupPlace.querySelector('.popup__container_place');
const template = document.querySelector('#element');
const popupProfileForm = document.querySelector('.popup__container_profile');
const profileObject = {name: '.profile__name', info: '.profile__job'};


const createCard = (item) => {
 const card = new Card(item, template, handleCardClick).getCard();
 return card;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    // const card = new Card(item, template, handleCardClick).getCard();
    cardList.addItem(card)}
}, '.element__list');

const handleCardClick = (evt) => {
    const popupImageObject = new PopupWithImage('.popup_image');
    const image = evt.target.closest('.element__image');
    const point = evt.target.parentElement.querySelector('.element__point').textContent;
    const link = image.src;
    popupImageObject.open({ link, point });
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
  const newCard = createCard(element);
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



