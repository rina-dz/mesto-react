import React from 'react';
import { newApi } from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import '../index.css';

function App() {

  const [currentUser, setcurrentUser] = React.useState({});
  const [cards, addCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});

  React.useEffect(() => {
    newApi.getInitialCards()
      .then((res) => {
        addCards(res);
        console.log(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    newApi.getUserInfo()
      .then((res) => {
        const info = { name: res.name, description: res.about, avatar: res.avatar, _id: res._id };
        setcurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      newApi.setLike(card._id)
        .then((newCard) => {
          addCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      newApi.removeLike(card._id)
        .then((newCard) => {
          addCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardDelete(card) {
    newApi.deleteCard(card._id)
      .then(() => {
        addCards((state) => state.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    selectCard({});
  }

  function handleCardClick(card) {
    selectCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser(info) {
    newApi.changeUserInfo(info)
      .then(() => {
        setcurrentUser({name: info.name, description: info.description, _id: currentUser._id, avatar: currentUser.avatar});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(info) {
    newApi.changeAvatar(info)
      .then(() => {
        setcurrentUser({avatar: info.avatar, name: currentUser.name, description: currentUser.description, _id: currentUser._id });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    newApi.addNewCard(newCard)
      .then((resCard) => {
        addCards([resCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={() => {
            setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
          }}
          onEditProfile={() => {
            setEditProfilePopupOpen(!isEditProfilePopupOpen);
          }}
          onAddPlace={() => {
            setAddPlacePopupOpen(!isAddPlacePopupOpen);
          }}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
        <div className="popup" id="popup_card-delete" buttonText={'Да'}>
          <div className="popup__container">
            <h2 className="popup__title">Вы уверены?</h2>
            <button type="button" className="popup__close-icon" />
          </div>
        </div>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
