import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }
  open(evt) {
    this._popupSelector.classList.add('popup_opened');
    const image = evt.target.closest('.element__image');
    const point = evt.target.parentElement.querySelector('.element__point').textContent;
    this._popupSelector.querySelector('.popup__big-image').src = image.src;
    this._popupSelector.querySelector('.popup__big-image').alt = `${point}`;
    this._popupSelector.querySelector('.popup__image-name').textContent = point;
  }
}
