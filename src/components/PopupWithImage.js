import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this.bigImage = this._popupSelector.querySelector('.popup__big-image');
    this.imageName = this._popupSelector.querySelector('.popup__image-name');
  }

  open(imageObject) {
    super.open();
    this.bigImage.src = imageObject.link;
    this.bigImage.alt = imageObject.point;
    this.imageName.textContent = imageObject.point;
  }
}
