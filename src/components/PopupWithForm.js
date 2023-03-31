//не забыть добвать noValidate, когда будет подключена собственная валидация
function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`popup_${props.name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={`${props.name}Form`} id={`${props.name}_form`} className="form popup__form-edit" onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__submit" type="submit">{props.buttonText}</button>
        </form>
        <button type="button" className="popup__close-icon" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
