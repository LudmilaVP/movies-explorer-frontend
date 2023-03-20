import './App.css';
import { Route, Switch, useHistory} from 'react-router-dom';
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
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserProfile()
        .then((data) => {
          setLoggedIn(true)
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn])

  useEffect(() => {
    mainApi
      .checkToken()
      .then((data) => {
        if (data) {
          setLoggedIn(true)
          setCurrentUser(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loggedIn])

  function handleRegister({ name, email, password }) {
    authorization(name, email, password)
      .then(() => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin({ email, password }) {
    login(email, password)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err.message)
      })
  }


  function handleSignOut() {
    signout()
      .then(() => {
        setLoggedIn(false)
        history.push('/')
        localStorage.removeItem('films');
    localStorage.removeItem('filmsTumbler');
    localStorage.removeItem('filmsInputSearch');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('savedFilmsTumbler');
    localStorage.removeItem('savedFilmsInputSearch');
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleEditProfile(name, email) {
    mainApi.setUserInfo({ name, email })
      .then(() => {
        setCurrentUser({ name, email })
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>

          <Route exact path='/'>
            <Header loggedIn={!loggedIn} />
            <Main />
          </Route>

          <Route exact path="/movies">
            <Header loggedIn={loggedIn} />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Movies}
              isLoading={isLoading}
              messageError={errorMessage}
            />
          </Route>

          <Route exact path="/saved-movies">
            <Header loggedIn={loggedIn} />
            <ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
            isLoading={isLoading}
            messageError={errorMessage}

            />
          </Route>

          <Route path='/signup'>
            <Register handleRegister={handleRegister} messageError={errorMessage} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} messageError={errorMessage} />
          </Route>

          <Route exact path="/profile">
            <Header loggedIn={loggedIn} />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
