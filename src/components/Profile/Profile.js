import './Profile.css';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/useFormValidation.js';

function Profile({ onSignOut, handleUpdateProfile }) {
  const { values, handleChange, resetForm, isValid } = useFormValidation();
  const currentUser = useContext(CurrentUserContext); 

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {currentUser.name}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" value={values.name} onChange={handleChange} required />
          </div>

          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={values.email} onChange={handleChange} required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>

        <button className="profile__button" disabled={requirementValidity ? true : false}>Редактировать</button>
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
