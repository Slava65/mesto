class formValidator {
  constructor(formElement, validateElement) {

  }

  showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__text_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active');
  }


  }









}
