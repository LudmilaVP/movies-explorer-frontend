import './Profile.css';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/ProfileValidation';

function Profile({ handleSignOut, handleProfile }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
  const currentUser = useContext(CurrentUserContext); // подписка на контекст

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
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
          {errors?.name && <span className="profile__error">{errors.name}</span>}
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={values.email} onChange={handleChange} required />
          </div>
          <p className="profile__text">E-mail</p>
          {errors?.email && <span className="profile__error">{errors.email}</span>}
        </div>

            <button  className={`profile__button ${requirementValidity ? 'profile__button_disabled' : ''}`} disabled={requirementValidity ? true : false}>Редактировать</button>
            <button className="profile__button profile__button_logout" onClick={handleSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
