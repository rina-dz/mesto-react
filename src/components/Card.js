import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === currentUser._id;
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__active-like'}`
    );

    function handleClick() {
        props.onCardClick({ link: props.link, name: props.name });
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <article className="element">
            {isOwn && <button className="element__trash" type="button" onClick={handleDeleteClick} />}
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__name">{props.name}</h2>
                <div className="element__like-place">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <h2 className="element__like-counter">{props.likesNum}</h2>
                </div>
            </div>
        </article>
    )
}

export default Card;
