import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject } from '../scripts/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { data } from 'autoprefixer';

//Переменные
const popupEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_job');
const popupPlace = document.querySelector('.popup_place')
const popupAddButton = document.querySelector('.profile__add-button');
const popupPlaceForm = popupPlace.querySelector('.popup__container_place');
const template = document.querySelector('#element');
const popupProfileForm = document.querySelector('.popup__container_profile');
const profileObject = {name: '.profile__name', about: '.profile__job'};

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-17/',
  headers: {
    authorization: '0e96ce82-cb8c-46ca-92d9-5a6f89ffec59',
    'Content-Type': 'application/json'
  }
})

const renderer = item => {
  const card = createCard(item);
  cardList.addItem(card)
}

const cardList = new Section(renderer, '.element__list');

//Инициализация карточек с сервера
api.getInitialCards()
.then((data) => {
  cardList.renderElements(data);
  })
  .catch ((error) => {
    console.log(error);
})

//Ф-ция создания карточки
const createCard = (item) => {
 const card = new Card(item, template, handleCardClick).getCard();
 return card;
}

//Ф-ция - параметр открывающая попап с картинкой
const handleCardClick = (imageObject) => {
  popupImage.open(imageObject);
}

//Ф-ция получения профайла от сервера
const getInfoUser = () => {
  const getInfo = api.getInfoUser();
  getInfo.then((getInfo) => {
    const myInfo = {};
    myInfo.name = getInfo.name;
    myInfo.about = getInfo.about;
    userInfo.setUserInfo(myInfo);
  })
  .catch((error) => {
    console.log(error);
  })
}
getInfoUser();

new FormValidator(validationObject, popupPlaceForm).enableValidation();

new FormValidator(validationObject, popupProfileForm).enableValidation();

const popupImage = new PopupWithImage('.popup_image');

const userInfo = new UserInfo(profileObject);

//Редактирование профайла
const popupProfileObject = new PopupWithForm('.popup_profile', (data) => {
  api.editInfoUser({name: data.name, about: data.about})
      .then(info => {
        userInfo.setUserInfo({
          name: info.name,
          about: info.about,
      })
        popupProfileObject.close();
      })
     .catch((error) => {
      console.log(error);})
});

//Добавление карточки
const popupPlaceObject = new PopupWithForm('.popup_place', (data) => {
  api.addNewCard({name: data.name, link: data.link})
    .then(info => {
      const newCard = createCard({name: info.name, link: info.link});
      cardList.addItem(newCard);
      popupPlaceObject.close();
    })
   .catch((error) => {
    console.log(error);})
});

//Обработчики
popupPlaceObject.setEventListeners();

popupProfileObject.setEventListeners();

popupImage.setEventListeners();

popupEditButton.addEventListener('click', () => {
  popupProfileObject.open();
  const profileValue = userInfo.getUserInfo();
  nameInput.value = profileValue.name;
  jobInput.value = profileValue.about;
});

popupAddButton.addEventListener('click', () => {
  popupPlaceObject.open();
});




const avatarEditBtn = document.querySelector('.popup__refresh-ava-btn');
// avatarEditBtn.addEventListener('click', document.querySelector('.popup_avatar').classList.add('popup_opened'));

const avatarEdur = document.querySelector('.profile__avatar-edit');
avatarEdur.addEventListener('click', () => console.log('Работает'));
