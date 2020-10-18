import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this.bigImage = this._popupSelector.querySelector('.popup__big-image');
    this.imageName = this._popupSelector.querySelector('.popup__image-name');
  }

  open({ link, point }) {
    super.open();
    // const image = evt.target.closest('.element__image');
    // const point = evt.target.parentElement.querySelector('.element__point').textContent;
    this.bigImage.src = link;
    this.bigImage.alt = point;
    this.imageName.textContent = point;


    // this.bigImage.src = image.src;
    // this.bigImage.alt = `${point}`;
    // this.imageName.textContent = point;

    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape") {
        this._handleEscClose();
      }
    })
  }
}
