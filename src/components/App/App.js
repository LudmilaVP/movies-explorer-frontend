import './App.css';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { authorization, login, signout } from '../../utils/auth';
import mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [messageError, setMessageError] = useState(false)
  const history = useHistory()
  const { pathname } = useLocation()

  function getUserInfo() {
    mainApi.getUserProfile()
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
  
  const tokenCheck = () => {
    mainApi.getUserProfile()
      .then((res) => {
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

 useEffect(() => {
    tokenCheck();
  }, [])

  function handleRegister({ name, email, password }) {
    authorization(name, email, password)
      .then(() => {
        handleLogin(email, password)
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin({ email, password }) {
    login(email, password)
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
    signout()
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
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header loggedIn={loggedIn} isLoading={isLoading} /> : ''}
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={Movies}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={SavedMovies}
          />

          <Route path='/signup'>
          {loggedIn ? <Redirect to='/movies' /> : <Register handleRegister={handleRegister} messageError={messageError} />}
          </Route>

          <Route path='/signin'>
          {loggedIn ? <Redirect to='/movies' /> : <Login handleLogin={handleLogin} messageError={messageError} />}
          </Route>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
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