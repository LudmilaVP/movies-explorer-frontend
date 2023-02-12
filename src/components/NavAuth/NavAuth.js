import './NavAuth.css';
import { Link } from 'react-router-dom';

function NavAuth() {
  return (
    <nav className="navigation-auth">
      <ul className="navigation-auth__list">
        <li className="navigation-auth__list-item">
          <Link to="/signup" className="navigation-auth__link navigation-auth__link_type_signup">Регистрация</Link>
        </li>
        <li className="auth__list-item">
          <Link to="/signin" className="navigation-auth__link navigation-auth__link_type_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavAuth;