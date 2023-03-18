function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="popup_image">
      <div className="popup__image-box">
        <img src={props.card.link} className="popup__image" alt={props.card.name} />
        <h2 className="popup__description" />
        <button type="button" className="popup__close-icon" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default ImagePopup;
