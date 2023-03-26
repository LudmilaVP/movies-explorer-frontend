import './Profile.css';
import { useCallback, useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProfileValidation from '../../utils/ProfileValidation';

function Profile({ onSignOut, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
    const currentUserName = currentUser.name
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const { values, setValues, handleChange, errors, isValid } = ProfileValidation();

    const checkStatusSubmit = useCallback(() => {
        return !isValid || values.name === currentUser.name && values.email === currentUser.email;

    }, [isValid, values, currentUser]);

    useEffect(() => {
        setValues({ 'name': currentUser.name, 'email': currentUser.email });
    }, [setValues, currentUser]);

    useEffect(() => {
        setIsSubmitDisabled(checkStatusSubmit());
    }, [checkStatusSubmit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        onUpdateProfile(values);
        checkStatusSubmit();
    }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {currentUserName}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" value={values.name || ''} onChange={handleChange} required />
          </div>
          <span className='profile__error'>{errors.name || ''}</span>
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={values.email || ''} onChange={handleChange} required />
          </div>
          <p className="profile__text">E-mail</p>
          <span className='profile__error'>{errors.email || ''}</span>
        </div>
        <button className="profile__button" disabled={isSubmitDisabled}>Редактировать</button>
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>
      </form>
    </section>
  );
};

export default Profile;
