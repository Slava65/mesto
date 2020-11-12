import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject } from '../scripts/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { Confirm } from '../components/Confirm.js';
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
const profileObject = {name: '.profile__name', about: '.profile__job', avatar: '.profile__avatar'};
const myId = '85a711df53234156e7903c38';

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
const initCard = () => {
  api.getInitialCards()
    .then((data) => {
    cardList.renderElements(data);
    })
    .catch ((error) => {
    console.log(error);
    })
}
initCard();

//Ф-ция создания карточки
const createCard = (item) => {
 const card = new Card(item, template, handleCardClick, myId, confirmDel, handleLikeClick).getCard();
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
    myInfo.avatar = getInfo.avatar;
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
        renderLoading(true);
        userInfo.setUserInfo({
          name: info.name,
          about: info.about,
      })
        popupProfileObject.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading(false);
      });
});

//Добавление карточки
const popupPlaceObject = new PopupWithForm('.popup_place', (data) => {
  api.addNewCard({name: data.name, link: data.link})
    .then(info => {

      const newCard = createCard({name: info.name, link: info.link, likes: info.likes, owner: info.owner, cardId: info._id});
      console.log(newCard)
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

document.querySelector('.popup__close_confirm').addEventListener('click', () => {
  document.querySelector('.popup_confirm').classList.remove('popup_opened');
})

const confirmPopup = new Confirm('.popup_confirm');

confirmPopup.setEventListeners();

const confirmDel = (id, card) => {
  confirmPopup.open();
  confirmPopup.setSubmitCallback(() => {
    api.delCard(id)
      .then((data) => {
        console.log(data);
        confirmPopup.close();
        card.removeCard();
        })
      .catch((error) => {
        console.log(error);
      })
  })
}

const handleLikeClick = (card) => {
  const cardId = card.getIdCard();
  const isLiked = card.isLiked();
  api.setLike(cardId, isLiked)
    .then(newCard => {
      const likes = newCard.likes;
      card.renderLikes(likes, !isLiked);
      card.refreshDataLikes(likes);
    })
    .catch((error) => {
      console.log(error);
    })
}




const avatarBtn = document.querySelector('.profile__avatar');

avatarBtn.addEventListener('click', () => document.querySelector('.popup_avatar').classList.add('popup_opened'));

const avatarPopup = document.querySelector('.popup_avatar');

// const openAvatarPopup = () => {
//   avatarPopup.classList.add('popup_opened');
// }

const saveAvatar = document.querySelector('.popup__refresh-ava-btn');



saveAvatar.addEventListener('click', () => {
const newAva = document.querySelector('.popup__text_avatar').textContent;
api.setAva(newAva)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    // newAvaLink.textContent = '';
  })
})

const popupAvatarClose = document.querySelector('.popup__close_avatar');
popupAvatarClose.addEventListener('click', () => avatarPopup.classList.remove('popup_opened'));


const saveProfile = document.querySelector('.popup__save_profile');

const renderLoading = (isLoading) => {
  if (isLoading) {
    saveProfile.setAttribute("textContent", 'Сохранение...');
    console.log('true работает');
  }
  else {
  saveProfile.setAttribute('textContent', 'Сохранить');
  }
}
