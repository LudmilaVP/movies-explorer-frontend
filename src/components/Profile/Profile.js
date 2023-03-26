import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, handleUpdateProfile }) {
  const user = useContext(CurrentUserContext);

  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [disableForm, setDisableForm] = useState(true)

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailChange(e) {
    setUserEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateProfile({
      name: userName,
      email: userEmail
    })
  }

  useEffect(() => {
    if (userName !== user.name || userEmail !== user.email) {
      setDisableForm(false)
    }
     else {
      setDisableForm(true)
    }
  }, [handleNameChange, handleEmailChange, userName, userEmail, user.name, user.email])

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {user.name}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" name="name" defaultValue={user.name} onChange={handleNameChange} required />
          </div>

          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" name="email" defaultValue={user.email} onChange={handleEmailChange} required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>

        <button className="profile__button" disabled={disableForm}>Редактировать</button>
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>

      </form>
    </section>
  );
};

export default Profile;
