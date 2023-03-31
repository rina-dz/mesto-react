import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {

    const [name, setNewName] = React.useState('');
    const [description, setNewDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setNewName(currentUser.name);
        setNewDescription(currentUser.description);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name, description });
    }

    function handleNameChange(e) {
        setNewName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setNewDescription(e.target.value);
    }

    return (
        <PopupWithForm name={'edit'} onSubmit={handleSubmit} title={'Редактировать профиль'} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'}>
            <div>
                <input type="text" name="Username" onChange={handleNameChange} value={name || ''} placeholder="Имя" className="popup__text" id="input_name" minLength={2} maxLength={40} required />
                <span className="popup__error" id="input_name-error" />
                <input type="text" name="Occupation" onChange={handleDescriptionChange} value={description || ''} placeholder="Род деятельности" className="popup__text" id="input_job" minLength={2} maxLength={200} required />
                <span className="popup__error" id="input_job-error" />
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
