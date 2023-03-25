import './App.css';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
import * as auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi.js'

function App() {
  const [messageError, setMessageError] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [movies, setMovies] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [moreCards, setMoreCards] = useState(0)
  const [savedMovies, setSavedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const { pathname } = useLocation();
  const history = useHistory()
  
  function getUserInfo() {
      mainApi.getUserProfile()
        .then((data) => {
          setLoggedIn(true)
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

  function searchMovie(movieName, isShortFilms) {
    setIsLoading(true)
    moviesApi.getApiMovies()
      .then((movies) => {
        const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
        const foundMovies = isShortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
        localStorage.setItem('shortFilms', isShortFilms)
        localStorage.setItem('searchMovieName', movieName)
        handleResize()
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
        setServerError(true)
        setIsLoading(false)
      })
  }

  function handleResize() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    if (foundMovies === null) {
      return
    }
    if (windowWidth >= 1280) {
      setMovies(foundMovies.slice(0, 12))
      setMoreCards(3)
    } else if (windowWidth > 480 && windowWidth < 1280) {
      setMovies(foundMovies.slice(0, 8))
      setMoreCards(2)
    } else if (windowWidth <= 480) {
      setMovies(foundMovies.slice(0, 5))
      setMoreCards(2)
    }
  }

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
    handleResize()
  }, [windowWidth])

  function handleShowMore() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    setMovies(foundMovies.slice(0, movies.length + moreCards))
  }

  function handleSearchMovie(movieName, isShortFilms) {
    searchMovie(movieName, isShortFilms)
  }

  function getSavedMovies() {
    mainApi.getMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    const path = pathname.pathname
    mainApi.getUserProfile()
      .then((userData) => {
        setLoggedIn(true)
        history.push(path)
        setCurrentUser(userData)
        getSavedMovies()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  function isSaved(card) {
    return savedMovies.some(item => item.movieId === card.id && item.owner === currentUser._id)
  }

  function handleMovieSave(movie) {
    mainApi.addMovie(movie)
      .then((movieData) => {
        setSavedMovies([...savedMovies, movieData])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleMovieDelete(card) {
    const deleteCard = savedMovies.find(c => c.movieId === (card.id || card.movieId) && c.owner === currentUser._id)
    if (!deleteCard) return
    mainApi.deleteMovie(deleteCard._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(c => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleRegister({ name, email, password }) {
    auth.authorization(name, email, password)
      .then(() => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
        getUserInfo()
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
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
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header loggedIn={loggedIn} /> : ''}
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

            <ProtectedRoute path="/movies"
              component={Movies}
              cards={movies}
              defaultSearchValue={localStorage.getItem('searchMovieName') || ""}
              isSaved={isSaved}
              handleShowMore={handleShowMore}
              handleSearchMovie={handleSearchMovie}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete}
              serverError={serverError}
              isLoading={isLoading}
              loggedIn={loggedIn}
            />

            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              cards={savedMovies}
              isSaved={isSaved}
              onMovieDelete={handleMovieDelete}
              serverError={serverError}
              loggedIn={loggedIn}
              isLoading={isLoading}
            />

          <Route path='/signup'>
            <Register handleRegister={handleRegister} messageError={messageError} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} messageError={messageError} />
          </Route>

            <ProtectedRoute path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleSignOut={handleSignOut}
            />

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
