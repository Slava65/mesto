let popup = document.querySelector('.popup')
let popupEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_job');
let popupForm = popup.querySelector('.popup__container');

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

function popupSubmitHandler(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupToggle();
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', popupSubmitHandler);






