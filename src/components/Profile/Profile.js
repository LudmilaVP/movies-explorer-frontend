import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import mainApi from '../../utils/MainApi';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext)
  const [isInputDisabled, setIsInputDisabled] = useState(true)

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])

  function handleEditProfile() {
    setIsInputDisabled(false)
  }

  const [values, setValues] = useState()
  const handleChange = e => {
    const target = e.target
    const { name, value } = target
    setValues({...values, [name]: value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (values.name && values.email && values.password) {
      handleEditProfile(values.name, values.email, values.password)
    }
    else if (values.email && values.password){
      handleEditProfile(values.email, values.password)
    }
    else {
      handleEditProfile(values.name, values.email)
    }
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
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={values?.email} onChange={handleChange} disabled={isInputDisabled} required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <Link to="/profile" className="profile__button" onClick={handleEditProfile}>Редактировать</Link>
        <Link to="/" className="profile__link" onClick={props.handleSignOut}>Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;
