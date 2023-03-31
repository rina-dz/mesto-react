import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm name={'add'} onSubmit={handleSubmit} title={'Новое место'} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Создать'}>
            <div>
                <input type="text" name="Placename" ref={nameRef} placeholder="Название" className="popup__text" id="input_placename" minLength={2} maxLength={30} required />
                <span className="popup__error" id="input_placename-error" />
                <input name="PictureLink" ref={linkRef} placeholder="Ссылка на картинку" className="popup__text" id="input_link" type="url" required />
                <span className="popup__error" id="input_link-error" />
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;


