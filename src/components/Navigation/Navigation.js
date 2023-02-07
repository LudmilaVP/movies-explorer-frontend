import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  function handlePopupOpen() {
    setIsPopupOpen(true)
  }

  function handlePopupClose() {
    setIsPopupOpen(false)
  }

  return (
    <>
      {!props.loggedIn ? (
        <nav className="navigation">
          <Link to="/signup" className="navigation__link navigation__link_unlogged hover-link">Регистрация</Link>
          <Link to="/signin" className="navigation__link navigation__link_unlogged hover-button">Войти</Link>
        </nav>
      ) : (
        <>
          <div className={`${isPopupOpen ? "overlay" : ""}`}>
            <nav className={`navigation navigation__popup ${isPopupOpen ? "navigation__popup_open" : ""}`}>
              <button className="navigation__popup-button navigation__popup-button_close hover-button" onClick={handlePopupClose}></button>
              <Link to="/" className="navigation__link navigation__link_loggedin navigation__link-main hover-link" onClick={handlePopupClose}>Главная</Link>
              <NavLink to="/movies" className="navigation__link navigation__link_loggedin hover-link" activeClassName="navigation__link_active" onClick={handlePopupClose}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className="navigation__link navigation__link_loggedin hover-link" activeClassName="navigation__link_active" onClick={handlePopupClose}>Сохранённые фильмы</NavLink>
              <Link to="/profile" className="navigation__account-button hover-button" onClick={handlePopupClose}>
                Аккаунт
              </Link>
            </nav>
          </div>
          <button className="navigation__popup-button navigation__popup-button_burger hover-button" onClick={handlePopupOpen}></button>
        </>
      )}
    </>
  )
}

export default Navigation