import './App.css';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
import auth from '../../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [messageError, setMessageError] = useState(false)

  const history = useHistory()
  const { pathname } = useLocation()

  function getUserInfo() {
    auth.getUserInfo()
      .then((userData) => {
        setLoggedIn(true)
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        handleLogin(email, password)
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
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
    auth.signout()
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
          <Header loggedIn={!loggedIn} isLoading={isLoading} /> : ''}
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={!loggedIn}
            isLoading={isLoading}
            component={Movies}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={!loggedIn}
            isLoading={isLoading}
            component={SavedMovies}
          />

          <Route path='/signup'>
          <Register handleRegister={handleRegister} messageError={messageError} />
          </Route>

          <Route path='/signin'>
          <Login handleLogin={handleLogin} messageError={messageError} />
          </Route>

          <ProtectedRoute
            path='/profile'
            loggedIn={!loggedIn}
            isLoading={isLoading}
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
