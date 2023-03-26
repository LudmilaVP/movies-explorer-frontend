import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/ProfileValidation';

function Profile(props) {
  const { handleChange, handleSubmit, values, errors, isValid, setValues } = useFormValidation(props.handleUpdateProfile)
  const currentUser = useContext(CurrentUserContext)
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])

  function handleUpdateProfile() {
    setIsInputDisabled(false)
  }

  function handleSave() {
    setIsSuccess(true)
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {currentUser.name}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" value={values?.name} onChange={handleChange} disabled={isInputDisabled} required />
          </div>
          {errors?.name && <span className="profile__error">{errors.name}</span>}
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={values?.email} onChange={handleChange} disabled={isInputDisabled} required />
          </div>
          <p className="profile__text">E-mail</p>
          {errors?.email && <span className="profile__error">{errors.email}</span>}
        </div>

        {isSuccess ? <p className="profile__button profile__button_status">Изменения сохранены</p> :
          <span className="profile__error">{errors?.email}</span>}

        {isInputDisabled ? (
          <>
            <button className="profile__button" onClick={handleUpdateProfile}>Редактировать</button>
            <button className="profile__button profile__button_logout" onClick={props.handleSignOut}>Выйти из аккаунта</button>
          </>
        ) : (
          <button className={isValid ? "profile__button profile__button_save" :
            "profile__button profile__button_save_disabled"} onClick={handleSave} disabled={!isValid}>Сохранить</button>
        )}


      </form>
    </section>
  );
};

export default Profile;
