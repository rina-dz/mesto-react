class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  //получение карточек с сервера
  getInitialCards() {
    return this._request(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: this.headers
    })
  }

  //получения информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this.baseUrl}users/me`, {
      method: 'GET',
      headers: this.headers
    })
  }

  //изменение информации о пользователе
  changeUserInfo(newInfo) {
    const newName = newInfo.name;
    const newDescription = newInfo.description;
    return this._request(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
  }

  //изменение аватара пользователя
  changeAvatar(newInfo) {
    const newAvatar = newInfo.avatar;
    return this._request(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
  }

  //добавление новой карточки
  addNewCard(newCard) {
    const cardName = newCard.name;
    const cardLink = newCard.link;
    return this._request(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
  }

  //удаление карточки
  deleteCard(cardId) {
    return this._request(`${this.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  //поставить лайк
  setLike(cardId) {
    return this._request(`${this.baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  //убрать лайк
  removeLike(cardId) {
    return this._request(`${this.baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
};

const newApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '9d97c533-6f82-4668-9816-7bf0cf3c6ccd',
    'Content-Type': 'application/json'
  }
})

export { newApi };