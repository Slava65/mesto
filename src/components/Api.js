export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // delCard() {
  //   return fetch(`${this._url}${id}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //     body: JSON.stringify(data)
  //   })
  //   .then ((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  // }

  getInfoUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editInfoUser({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // getLikes() {

  // }

  // setLike() {
  //   return fetch(this._url, {
  //     method: 'PUT',
  //     headers: this._headers
  //   });
  // }

  // delLike() {
  //   return fetch(this._url, {
  //     method: 'DELETE',
  //     headers: this._headers
  //   });
  // }

  // setAva() {
  //   return fetch(this._url, {
  //     method: 'PATCH',
  //     headers: this._headers
  //     body: JSON.stringify({
  //       avatar: newAva,
  //     })
  //   });
  // }

}


