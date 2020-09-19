export class Card {
   static _template = document.querySelector('#element').content;

  constructor(data, cardSelector) {
    this._text = data.name;
		this._image = data.link;
    this._cardSelector = cardSelector;
  }

    render = (container) => {
      this._cloneCard = _cardSelector.content.cloneNode(true);
      this._cloneCard = Card._template.cloneNode(true);
      this._cloneCard.querySelector('.element__image').src = this._image;
      this._cloneCard.querySelector('.element__point').textContent = this._text;
      container.append(this._cloneCard);
    }

  _deleteCard() {
    this._cardSelector.querySelector('.element__delete').addEventListener('click', event => {
      event.target.closest('.element').remove();
    })
  }

  _likeCard() {
    this._cardSelector.querySelector('.element__like').addEventListener('click', event => {
      const like = event.target.closest('.element__like');
      like.classList.toggle('element__like_active');
    })
  }

  // popupOpen() {
  //   if (!this.classList.contains('popup_opened')) {
  //     document.addEventListener("keydown", escPopap);
  //     this.classList.add('popup_opened');
  //   }
  //     else {
  //       document.removeEventListener("keydown", escPopap);
  //       this.classList.remove('popup_opened');
  //     }
  // }

  // openImage() {
  //   this._element.querySelector('.element__image').addEventListener('click', event => {
  //     popupOpen()
  //     const image = event.target.closest('.element__image');
  //     document.querySelector('.popup__big-image').src = image.src;
  //     document.querySelector('.popup__image-name').textContent = element.name;
  //   })
  // }
}
