import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

const Profile = ({ onSignOut, openPopup }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isButton, setButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    mainApi.updateUserInfo({ name, email }).then(() => {
      setButton(false);
      setLastName(name);
      setLastEmail(email);
      openPopup('Данные успешно изменены!');
    })
      .catch((err) => {
        openPopup(`Что-то пошло не так! ${err}`);
      });
  };

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);

    if (value !== lastName) {
      setButton(true);
    } else {
      setButton(false);
    }
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (value !== lastEmail) {
      setButton(true);
    } else {
      setButton(false);
    }
  }
  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {name}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" value={name} onChange={handleNameChange} required />
          </div>
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={email} onChange={handleEmailChange} required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <Link to="/profile" className="profile__button" disabled={!isButton}>Редактировать</Link>
        <Link to="/" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;
