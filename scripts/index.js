import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup } from './utils.js';
import { initialCards } from './constants.js';
import { validationObject } from './constants.js';
import { toggleButtonState } from './utils.js';

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

//Функции
//Функция сохранения данных редактирования профиля
function submitPopup(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  const button = popupProfileForm.querySelector('.popup__save')
  toggleButtonState(button);
  openPopup(popup);
}

//Функция отправки данных из окна редактирования профиля
popupEditButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popup);
});

//Создание экземпляра
const renderCard = (data, cardSelector, container) => {
  const card = new Card(data, cardSelector).getCard();
  container.prepend(card);
}

//Добавление карточек из списка
initialCards.forEach ((element) => {
  renderCard(element, template, elementList);
});

new FormValidator(validationObject, popupPlaceForm).enableValidation();
new FormValidator(validationObject, popupProfileForm).enableValidation();


//Обработчики событий
popupCloseButton.addEventListener('click', () => {
  openPopup(popup);
});

popupForm.addEventListener('submit', submitPopup);

//Слушатель открытия окна ввода новой карточки
popupAddButton.addEventListener('click', () => {
  openPopup(popupPlace);
});

//Слушатель закрытия
popupCloseButtonPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});

//Добавление новой карточки
popupPlaceForm.addEventListener('submit', event => {
  event.preventDefault()
  const element = {
    name : placeName.value,
    link : placeLink.value
  };
  renderCard(element, template, elementList);
  popupPlaceForm.reset();
  const button = popupPlaceForm.querySelector('.popup__save');
  toggleButtonState(button);
  openPopup(popupPlace);
});

//Слушатель закрытия окна с картинкой
const popupImageCloseButton = document.querySelector('.popup__close_image');
popupImageCloseButton.addEventListener('click', () => {
  openPopup(popupImage);
});

//Функция закрытия попапа кликом по оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
   popupElement.addEventListener('click', evt => {
      if (evt.target === evt.currentTarget) {
        openPopup(popupElement);
      }
    })
})


