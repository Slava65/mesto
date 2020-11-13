export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    myId,
    confirmDel,
    handleLikeClick,
    handleConfirmDelOpen
  ) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._myId = myId;
    this._confirmDel = confirmDel;
    this._handleLikeClick = handleLikeClick;
    this._handleConfirmDelOpen = handleConfirmDelOpen;
  }

  _setEventListeners() {
    this._cloneCard
      .querySelector(".element__like")
      .addEventListener("click", () => this._handleLikeClick(this));
    this._cloneCard
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard);
    this._cloneCard
      .querySelector(".element__image")
      .addEventListener("click", () =>
        this._handleCardClick({
          point: this._text,
          link: this._image,
        })
      );
  }

  _setDel = () => {
    if (this._owner !== this._myId) {
      this._cloneCard
        .querySelector(".element__delete")
        .classList.add("element__delete_none");
    }
  };

  _deleteCard = () => {
    const id = this._cardId;
    this._handleConfirmDelOpen();
    document
      .querySelector(".popup__confirmbtn")
      .addEventListener("click", () => {
        this._confirmDel(id, this);
        console.log(this._owner);
      });
  };

  removeCard() {
    this._cloneCard.remove();
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._myId);
  }

  refreshDataLikes(likes) {
    this._likes = likes;
  }

  getIdCard() {
    return this._cardId;
  }

  renderLikes = (likes, isLiked) => {
    if (isLiked) {
      this._cloneCard
        .querySelector(".element__like")
        .classList.add("element__like_active");
      this._cloneCard.querySelector(".element__likecount").textContent =
        likes.length;
    } else {
      this._cloneCard
        .querySelector(".element__like")
        .classList.remove("element__like_active");
      this._cloneCard.querySelector(".element__likecount").textContent =
        likes.length;
    }
  };

  getCard = () => {
    this._cloneCard = this._cardSelector.content.cloneNode(true).children[0];
    this._cloneCard.querySelector(".element__image").src = this._image;
    this._cloneCard.querySelector(".element__point").textContent = this._text;
    this._cloneCard.querySelector(
      ".element__likecount"
    ).textContent = this._likes.length;
    this._cloneCard.querySelector(".element__image").alt = `${this._text}`;
    this._setDel();
    const likes = this._likes;
    const isliked = this.isLiked();
    this.renderLikes(likes, isliked);
    this._setEventListeners();
    return this._cloneCard;
  };
}
