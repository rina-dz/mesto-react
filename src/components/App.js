import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

import '../index.css';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState('');

  function closeAllPopups() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    selectCard('');
  }

  function handleCardClick(card) {
    selectCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={() => {
          document.querySelector('#popup_avatar').classList.add('popup_opened');
          setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
        }}
        onEditProfile={() => {
          document.querySelector('#popup_edit').classList.add('popup_opened');
          setEditProfilePopupOpen(!isEditProfilePopupOpen);
        }}
        onAddPlace={() => {
          document.querySelector('#popup_add').classList.add('popup_opened');
          setAddPlacePopupOpen(!isAddPlacePopupOpen);
        }}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        children={
          <div>
            <input type="text" name="Username" placeholder="Имя" className="popup__text" id="input_name" minLength={2} maxLength={40} required />
            <span className="popup__error" id="input_name-error" />
            <input type="text" name="Occupation" placeholder="Род деятельности" className="popup__text" id="input_job" minLength={2} maxLength={200} required />
            <span className="popup__error" id="input_job-error" />
            <button className="popup__submit" type="submit">Сохранить</button>
          </div>
        }
      />
      <PopupWithForm name={'add'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        children={
          <div>
            <input type="text" name="Placename" placeholder="Название" className="popup__text" id="input_placename" minLength={2} maxLength={30} required />
            <span className="popup__error" id="input_placename-error" />
            <input name="PictureLink" placeholder="Ссылка на картинку" className="popup__text" id="input_link" type="url" required />
            <span className="popup__error" id="input_link-error" />
            <button className="popup__submit" type="submit">Создать</button>
          </div>
        }
      />
      <div className="popup" id="popup_card-delete">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__submit" type="submit" id="button_delete">Да</button>
          <button type="button" className="popup__close-icon" />
        </div>
      </div>
      <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        children={
          <div>
            <input type="url" name="Avatar" placeholder="Ссылка на картинку" className="popup__text" id="input_avatar" required />
            <span className="popup__error" id="input_avatar-error" />
            <button className="popup__submit" type="submit">Сохранить</button>
          </div>
        }
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
