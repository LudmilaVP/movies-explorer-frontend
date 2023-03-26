import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import mainApi from '../../utils/MainApi';

function Profile(props) {
  const { onProfile, logOut } = props;
  const currentUser = useContext(CurrentUserContext);

  const [value, setValue] = useState({ name: currentUser.name, email: currentUser.email });
  const [error, setError] = useState({ name: '', email: '' });
  const [isValidForm, setIsValidForm] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const hasError = apiError || error.email || error.name;

  function handleChange(e) {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value
    }));
    setError((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.validationMessage
    }));
    setIsValidForm(e.target.closest('form').checkValidity());
    setIsSubmit(false);
  }

  //кнопка редактировать становится неактивной, если данные совпадают
  useEffect(() => {
    setIsDisabled(currentUser.name === value.name && currentUser.email === value.email)
  }, [value.name, value.email, currentUser.name, currentUser.email]);

  // // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValue({ name: currentUser.name, email: currentUser.email })
  }, [currentUser.name, currentUser.email]);

  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onProfile(value, setApiError);
    setIsSubmit(true);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__welcome">Привет, {value.name}!</h3>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__field profile__field_type_name">
            <input className="profile__settings" value={value.name} onChange={handleChange} required />
          </div>
          <div className="profile__field profile__field_type_email">
            <input className="profile__settings" value={value.email} onChange={handleChange} required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <Link to="/profile" className="profile__button" disabled={!isValidForm || isDisabled}>Редактировать</Link>
        <Link to="/" className="profile__link" onClick={logOut}>Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;
