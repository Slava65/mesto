import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
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

function popupOpen(selector) {
  if (!selector.classList.contains('popup_opened')) {
    document.addEventListener("keydown", escPopap);
    selector.classList.add('popup_opened');
  }
    else {
      document.removeEventListener("keydown", escPopap);
      selector.classList.remove('popup_opened');
    }
}

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

//Создание нового экземпляра класса Card
initialCards.forEach ((element) => {
  new Card(element, '').render(elementList);
})

//Слушатель открытия окна ввода новой карточки
popupAddButton.addEventListener('click', () => {
  popupOpen(popupPlace);
});

//Слушатель закрытия
popupCloseButtonPlace.addEventListener('click', () => {
  popupOpen(popupPlace);
});

//Добавление новой карточки
popupPlaceForm.addEventListener('submit', event => {
  event.preventDefault()
  const element = {
    name : placeName.value,
    link : placeLink.value
  };
  new Card(element, '').render(elementList);
  popupPlaceForm.reset();
  popupOpen(popupPlace);
});

//Слушатель открытия окна с картинкой
const imageList = Array.from(document.querySelectorAll('.element__image'));
imageList.forEach((item) => {
  item.addEventListener('click', event => {
  popupOpen(popupImage);
  const image = event.target.closest('.element__image');
  document.querySelector('.popup__big-image').src = image.src;
  document.querySelector('.popup__image-name').textContent = element.name;
  })
});

//Слушатель закрытия окна с картинкой
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

//Создание нового экземпляра класса FOrmValidator
Array.from(document.querySelectorAll('.popup__container')).forEach((form) => {
  new FormValidator({
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_active'
  }, form).enableValidation();
})
