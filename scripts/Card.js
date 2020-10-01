export class Card {
   static _template = document.querySelector('#element').content;

  constructor(data, cardSelector) {
    this._text = data.name;
		this._image = data.link;
    this._cardSelector = cardSelector;
  }

    render = (container) => {
      this._cloneCard = Card._template.cloneNode(true);
      this._cloneCard.querySelector('.element__image').src = this._image;
      this._cloneCard.querySelector('.element__point').textContent = this._text;
      this._deleteCard();
      this._likeCard();
      container.prepend(this._cloneCard);
    }

  _deleteCard() {
    this._cloneCard.querySelector('.element__delete').addEventListener('click', event => {
      event.target.closest('.element').remove();
    })
  }

  _likeCard() {
    this._cloneCard.querySelector('.element__like').addEventListener('click', event => {
      const like = event.target.closest('.element__like');
      like.classList.toggle('element__like_active');
    })
  }
}
