import { Card } from './Card.js';

const popup = document.querySelector('.popup')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_job');
const popupForm = popup.querySelector('.popup__container');
const elementContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_image');
const elementImage = document.querySelector('.element__button-image');
const popupBigImage = document.querySelector('.popup__big-image');
const popupPlace = document.querySelector('.popup_place')
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonPlace = popupPlace.querySelector('.popup__close_place');
const linkPlaceInput = document.querySelector('.popup__text_place-link');
const popupPlaceForm = popupPlace.querySelector('.popup__container_place');
const elementList = document.querySelector('.element__list');
const imageName =  document.querySelector('.popup__image-name');
const userElement = document.querySelector('#element');
const popupOpened = document.querySelector('.popup_opened');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const popupOpen = ((selector) => {
  if (!selector.classList.contains('popup_opened')) {
    document.addEventListener("keydown", escPopap);
    selector.classList.add('popup_opened');
  }
    else {
      document.removeEventListener("keydown", escPopap);
      selector.classList.remove('popup_opened');
    }
})

//Функция сохранения данных редактирования профиля
function popupSubmitHandler(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupOpen(popup);
}

//Функция отправки данных из окна редактирования профиля
popupEditButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpen(popup)
});
popupCloseButton.addEventListener('click', () => {
  popupOpen(popup)
});
popupForm.addEventListener('submit', popupSubmitHandler);
////
initialCards.forEach ((element) => {
  new Card(element, '').render(elementContainer);
})

popupAddButton.addEventListener('click', () => {
  popupOpen(popupPlace);
});

popupCloseButtonPlace.addEventListener('click', () => {
  popupOpen(popupPlace);
});

popupPlaceForm.addEventListener('submit', event => {
  event.preventDefault()
  element = {
    name : popupPlaceForm.querySelector('.popup__text_place-name').value,
    link : popupPlaceForm.querySelector('.popup__text_place-link').value
  };
  addCard(element);
  popupPlaceForm.reset();
  popupOpen(popupPlace);
});

const popupImageCloseButton = document.querySelector('.popup__close_image');
popupImageCloseButton.addEventListener('click', () => {
  popupOpen(popupImage);
});

//Функция закрытия попапа кликом по оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
   popupElement.addEventListener('click', evt => {
      if (evt.target === evt.currentTarget) {
        popupOpen(popupElement);
      }
    })
})

//Функция закрытия попапа по Esc
function escPopap(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popupOpened) => {
      if (popupOpened.classList.contains("popup_opened")) {
        popupOpen(popupOpened);
      }
    });
  }
}

