import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, handleUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [isValid, setIsValid] = useState(false)
  const [values, setValues] = useState()
  

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])

  const handleSubmit = e => {
    e.preventDefault()
    handleUpdateProfile(values.name, values.email)
  }

  function handleChange(e) {
    const target = e.target
    const { name, value } = target
    setValues({ ...values, [name]: value })
    setIsValid(false);
  }

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

        <button className="profile__button" disabled={!isValid}>Редактировать</button>
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
