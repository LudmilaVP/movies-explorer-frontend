import './Header.css';
import { Link, Route } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';

function Header (props) {

  const endpoints = [
    "/",
    "/profile",
    "/movies",
    "/saved-movies",
  ]

  return (
    <Route exact path={endpoints}>
      <header className="header">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Логотип"></img>
        </Link>
        {props.isLoading ? '' : props.loggedIn ? <Navigation /> : <NavAuth />}
      </header>
    </Route>
  );
};

export default Header;