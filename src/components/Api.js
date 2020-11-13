export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResult = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._handleResult);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResult);
  }

  delCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResult);
  }

  getInfoUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._handleResult);
  }

  editInfoUser({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResult);
  }

  setLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    }).then(this._handleResult);
  }

  setAva(newAva) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAva,
      }),
    }).then(this._handleResult);
  }
}
