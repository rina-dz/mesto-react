function Card(props) {
    function handleClick() {
        props.onCardClick({link: props.link, name: props.name});
    }

    return (
        <article className="element">
            <button className="element__trash" type="button" />
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__name">{props.name}</h2>
                <div className="element__like-place">
                    <button className="element__like" type="button" />
                    <h2 className="element__like-counter">{props.likes}</h2>
                </div>
            </div>
        </article>
    )
}

export default Card;
