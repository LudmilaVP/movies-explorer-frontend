import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn }) => {
  return (

    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"></img>
      </Link>
      {loggedIn
        ? <NavAuth />
        : <><Navigation /></>
      }
        </header>
  );
};

      export default Header;