import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('.popup__container').reset();
    this._popupSelector.querySelector('.popup__save').classList.toggle('popup__save_inactive');
    this._popupSelector.querySelector('.popup__save').setAttribute("disabled", "disabled");
  }
}

