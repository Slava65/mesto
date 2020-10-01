const formElement = document.querySelector('.popup__container');
const profileNameInput = document.querySelector('.popup__text_name');
const profileJobInput = document.querySelector('.popup__text_job');
const placeNameInput = document.querySelector('.popup__text_place-name');
const placeLinkInput = document.querySelector('.popup__text_place-link');
const errorProfileName = document.querySelector('.popup__error_type_profile-name');
const errorProfileJob = document.querySelector('.popup__error_type_profile-job');
const errorPlaceName = document.querySelector('.popup__error_type_place-name');
const errorPlaceLink = document.querySelector('.popup__error_type_place-link');
const btnProfile = document.querySelector('.popup__save');
const btnPlace = document.querySelector('.popup__save_place');

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_active'
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__text_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.setAttribute("disabled", "disabled");//
  } else {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  });
};





