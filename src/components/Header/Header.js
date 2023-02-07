import { Route, Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation'
import './Header.css'

function Header(props) {
  const points = [
    "/",
    "/profile",
    "/movies",
    "/saved-movies",
  ]

  return (
    <Route exact path={points}>
      <header className="header">
      <Link to="/">
      <img className="logo" src={logo} alt="Логотип сайта" />
    </Link>
        <Navigation loggedIn={props.loggedIn} />
      </header>
    </Route>
  )
}

export default Header