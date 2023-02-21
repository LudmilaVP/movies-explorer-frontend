import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn, isLoading }) => {
  const { pathname } = useLocation();
  return (
  
    <header className={`header ${pathname !== '/'}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"></img>
      </Link>
      {isLoading ? '' : loggedIn ? <Navigation /> : <NavAuth />}
    </header>

  );
};

export default Header;