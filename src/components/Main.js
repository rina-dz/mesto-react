import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
          <p className="profile__description">{currentUser.description}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {props.cards.map((el) => (
          <Card card={el} key={el._id} link={el.link} name={el.name} likes={el.likes} likesNum={el.likes.length}
            owner={el.owner} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;