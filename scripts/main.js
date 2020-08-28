let popup = document.querySelector('.popup')
let popupEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_job');
let popupForm = popup.querySelector('.popup__container');

//Функция открытия и закрытия всплывающего окна редактирования профиля
let popupToggle = function () {
  if (!popup.classList.contains('popup_opened')) {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  }
  else {
    popup.classList.remove('popup_opened');
  }
}

//Функция сохранения данных редактирования профиля
function popupSubmitHandler(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupToggle();
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', popupSubmitHandler);

const elementContainer = document.querySelector('.elements');

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

const popupImage = document.querySelector('.popup_image');
const elementImage = document.querySelector('.element__button-image');
const popupBigImage = document.querySelector('.popup__big-image');
const popupImageOpen = function () {
  if (!popupImage.classList.contains('popup_opened-image')) {
  popupImage.classList.add('popup_opened-image');
  }
  else {
    popupImage.classList.remove('popup_opened-image');
  }
}

//Функция добавление ссылки и названия в карточку
  const addElementContainer = element => {
    const userElement = document.querySelector('#element').content.cloneNode(true);
    userElement.querySelector('.element__image').src = element.link;
    userElement.querySelector('.element__point').textContent = element.name;
    userElement.querySelector('.element__delete').addEventListener('click', event => {
    const del = event.target.closest('.element');
    del.remove()
    });
    userElement.querySelector('.element__like').addEventListener('click', event => {
      const like = event.target.closest('.element__like');
      like.style.backgroundImage = (getComputedStyle(like).backgroundImage.includes('active')) ? 'url(./images/element-like.svg)' : 'url(./images/element-like-active.svg)';
     })
    userElement.querySelector('.element__image').addEventListener('click', event => {
      popupImageOpen();
      const image = event.target.closest('.element__image');
      popupBigImage.src = image.src;
      document.querySelector('.popup__image-name').textContent = element.name;
    })
    return userElement;
    }

  const addCard = userElement => {
    elementContainer.append(userElement);
  }

initialCards.forEach ((element) => {
  addElementContainer(element);
  let a = addElementContainer(element);
  addCard(a);
})

let popupPlace = document.querySelector('.popup_place')
let popupAddButton = document.querySelector('.profile__add-button');
let popupCloseButtonPlace = popupPlace.querySelector('.popup__close_place');
let linkPlaceInput = document.querySelector('.popup__text_place-link');
let popupPlaceForm = popupPlace.querySelector('.popup__container_place');

let popupPlaceToggle = function () {
  if (!popupPlace.classList.contains('popup_opened-place')) {
  popupPlace.classList.add('popup_opened-place');

  }
  else {
    popupPlace.classList.remove('popup_opened-place');
  }
}

 popupAddButton.addEventListener('click', popupPlaceToggle);
 popupCloseButtonPlace.addEventListener('click', popupPlaceToggle);

const addNewCard = newElement => {
  elementContainer.prepend(newElement);
}

 popupPlaceForm.addEventListener('submit', event => {
  event.preventDefault()
  newElement = {
    name : popupPlaceForm.querySelector('.popup__text_place-name').value,
    link : popupPlaceForm.querySelector('.popup__text_place-link').value
  }
  addElementContainer(newElement);
  b = addElementContainer(newElement);
  addNewCard(b);
  popupPlaceForm.reset();
  popupPlaceToggle();
 });

const popupImageCloseButton = document.querySelector('.popup__close_image');
popupImageCloseButton.addEventListener('click', popupImageOpen);








