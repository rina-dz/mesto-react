import React, { useState, useEffect } from 'react';
import { newApi } from '../utils/api.js';
import Card from './Card.js';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, addCards] = React.useState([]);

  React.useEffect(() => {
    newApi.getUserInfo()
      .then((res) => {
        const info = { name: res.name, description: res.about, avatar: res.avatar, _id: res._id };
        setUserName(info.name);
        setUserDescription(info.description);
        setUserAvatar(info.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  });

  React.useEffect(() => {
    newApi.getInitialCards()
      .then((res) => {
        addCards(res.map((el) => ({
          name: el.name,
          link: el.link,
          likes: el.likes.length,
          _id: el._id
        })));
      })
      .catch((err) => {
        console.log(err);
      })
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((el) => (
          <Card key={el._id} link={el.link} name={el.name} likes={el.likes} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;