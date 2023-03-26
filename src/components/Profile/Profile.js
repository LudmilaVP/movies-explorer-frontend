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
  const [isVisibleButton, setVisibleButton] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    mainApi.setUserProfile({ name, email }).then(() => {
      setVisibleButton(false);
      setLastName(name);
      setLastEmail(email);
    })
    .catch((err) => {
      console.log(err.message)
    });
  };

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
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

            <button className="profile__button" disabled={!isVisibleButton}>Редактировать</button>
            <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
