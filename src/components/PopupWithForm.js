import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._container = this._popupSelector.querySelector('.popup__container');
    this._saveButton = this._popupSelector.querySelector('.popup__save');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._container.reset();
    this._saveButton.classList.toggle('popup__save_inactive');
    this._saveButton.setAttribute("disabled", "disabled");
  }
}

