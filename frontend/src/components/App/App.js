import './App.css';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
  const [messageError, setMessageError] = useState(false)

  const history = useHistory()
  const { pathname } = useLocation()

  function getUserInfo() {
    mainApi.getUserInfo()
      .then((userData) => {
        setLoggedIn(true)
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password)
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
        getUserInfo()
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        setLoggedIn(false)
        console.log(err.message)
      })
  }

  function handleSignOut() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false)
        history.push('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {pathname === '/' || pathname === '/profile' || pathname === '/movies' || pathname === '/saved-movies' ?
          <Header loggedIn={!loggedIn} /> : ''}
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={!loggedIn}
            component={Movies}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={!loggedIn}
            component={SavedMovies}
          />

          <Route path='/signup'>
            {!loggedIn ? <Register handleRegister={handleRegister} textError={messageError} /> : <Redirect to='/movies' />}
          </Route>

          <Route path='/signin'>
            {!loggedIn ? <Login handleLogin={handleLogin} /> : <Redirect to='/movies' />}
          </Route>

          <ProtectedRoute
            path='/profile'
            loggedIn={!loggedIn}
            component={Profile}
            handleSignOut={handleSignOut}
          />

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
