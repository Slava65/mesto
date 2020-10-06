import { openImage } from './utils.js';
export class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
		this._image = data.link;
    this._cardSelector = cardSelector;
  }

    _setEventListeners() {
      this._cloneCard.querySelector('.element__like').addEventListener('click', this._likeCard);
      this._cloneCard.querySelector('.element__delete').addEventListener('click', this._deleteCard);
      this._cloneCard.querySelector('.element__image').addEventListener('click', openImage);
     }

  _deleteCard = () => {
    this._cloneCard.remove();
    this._cloneCard = null;
  }

  _likeCard = () => {
    this._cloneCard.querySelector('.element__like').classList.toggle('element__like_active');
  }

  getCard = () => {
    this._cloneCard = this._cardSelector.content.cloneNode(true).children[0];
    this._cloneCard.querySelector('.element__image').src = this._image;
    this._cloneCard.querySelector('.element__point').textContent = this._text;
    this._cloneCard.querySelector('.element__image').alt = `${this._text}`;
    this._setEventListeners();

    return this._cloneCard;
  }
}
