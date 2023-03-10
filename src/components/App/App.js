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
import { authorization, login, signout } from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('')
  const history = useHistory()
  const pathname = useLocation()
  const [movies, setMovies] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [moreCards, setMoreCards] = useState(0)
  const [savedMovies, setSavedMovies] = useState([])
  const [serverError, setServerError] = useState(false)

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    mainApi.getUserProfile()
      .then((userData) => {
        setLoggedIn(true)
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function searchMovie(movieName, isShortFilms) {
    setIsLoading(true)
    moviesApi.getApiMovies()
      .then((movies) => {
        const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
        const foundMovies = isShortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
        localStorage.setItem('searchMovieName', movieName)
        localStorage.setItem('shortFilms', isShortFilms)
        setIsLoading(false)
        handleResize()
      })
      .catch((err) => {
        console.log(err.message)
        setIsLoading(false)
        setServerError(true)
      })
  }

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth)
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

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
    handleResize()
  }, [windowWidth])

  function handleMore() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    setMovies(foundMovies.slice(0, movies.length + moreCards))
  }

  function handleSearch(movieName, isShortFilms) {
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


  function handleCardSave(movie) {
    mainApi.addMovie(movie)
      .then((movieData) => {
        setSavedMovies([...savedMovies, movieData])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleCardDelete(card) {
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

  function isSaved(card) {
    return savedMovies.some(item => item.movieId === card.id && item.owner === currentUser._id)
  }


  function handleEditProfile(name, email) {
    mainApi.setUserProfile({ name, email })
      .then(() => {
        setCurrentUser({ name, email })
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleRegister( name, email, password ) {
    authorization({name, email, password})
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
        getUserInfo()
      })
      .catch((err) => {
        setMessageError('Что-то пошло не так...')
        console.log(err.message)
        setLoggedIn(false)
      })
  }

  function handleLogin( email, password ) {
    login({email, password})
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
          <Header loggedIn={loggedIn} />
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={Movies}
            handleSearch={handleSearch}
            defaultSearchValue={localStorage.getItem('searchMovieName') || ""}
            cards={movies}
            isSaved={isSaved}
            onCardSave={handleCardSave}
            onCardDelete={handleCardDelete}
            serverError={serverError}
            handleMore={handleMore}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={SavedMovies}
            onCardDelete={handleCardDelete}
            serverError={serverError}
            isSaved={isSaved}
          />

          <Route path='/signup'>
            <Register handleRegister={handleRegister} messageError={messageError} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} messageError={messageError} />
          </Route>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={Profile}
            handleEditProfile={handleEditProfile}
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
