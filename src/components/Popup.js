export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape") {
        this._handleEscClose(evt);
      }
    })
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      if (evt.key === "Escape") {
        this._handleEscClose(evt);
      }
    })
  }

  _handleEscClose(evt) {
    this.close();
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.close());
  }
}
