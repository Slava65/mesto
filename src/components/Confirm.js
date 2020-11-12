export class Confirm {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this._popupSelector.classList.remove('popup_opened');
    })
  }

  setSubmitCallback(callback) {
    this._handleSubmitCallback = callback;
  }
}
