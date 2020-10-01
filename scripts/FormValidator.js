export class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;

    this._formElement = formElement;
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    // this._inputElement = this._formElement.querySelector(this._inputSelector);

    input.classList.add('popup__text_error');
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('popup__error_active');
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    // this._inputElement = this._formElement.querySelector(this._inputSelector);
    input.classList.remove('popup__text_error');
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
  }

  _isValid(input) {
    // this._inputElement = this._formElement.querySelector(this._inputSelector);
    if (this._hasInvalidInput()) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll('.popup__text')).some((input) => {
      return !input.validity.valid;
    })
  };

  _toggleButtonState() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add('popup__save_inactive');
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove('popup__save_inactive');
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners() {
    this._inputElement = this._formElement.querySelector(this._inputSelector);
    const inputList = Array.from(this._formElement.querySelectorAll('.popup__text'));
    this._toggleButtonState();
    inputList.forEach((element) => {
      element.addEventListener('input', () => {
        this._isValid(element);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListeners();
    };

  }










