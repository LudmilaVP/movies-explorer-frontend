import './Profile.css';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isButton, setButton] = useState(false);

  function handleSubmit() {
    mainApi.setUserProfile({ name, email })
    .then(() => {
      setButton(false);
      setLastName(name);
      setLastEmail(email);
    })
    .catch((err) => {
      console.log(err.message)
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

            <button className="profile__button" disabled={!isButton}>Редактировать</button>
            <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
