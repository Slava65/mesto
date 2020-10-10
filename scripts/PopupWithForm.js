import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.addEventListener('submit', this._submitForm);
  }

  _close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.reset();
  }
}

