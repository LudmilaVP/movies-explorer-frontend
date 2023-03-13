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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [moviesList, setMoviesList] = useState([]);
  const [errServer, setErrServer] = useState('');
  const [isOpen,setIsOpen] = useState(false);
  const [userId,setUserId] = useState('');
  const [moviesSavedList,setMoviesSavedList] = useState([]);
  const [message, setMessage] = useState({});
  const [searchAllMovies, setSearchAllMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [preloader,setPreloader] = useState(false);
  const [messageForMoviesList, setMessageForMoviesList] = useState('');
  const [messageForUserMoviesList, setMessageForUserMoviesList] = useState('');

  function closeMenu() {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserProfile()
        .then((data) => {
          setIsLoggedIn(true)
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  useEffect(() => {
    mainApi
      .checkToken()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true)
          setCurrentUser(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isLoggedIn])

  function onUpdateUser(data) {
    setPreloader(true);
    mainApi.setUserProfile(data)
    .then((data)=>{
      if(data.message) {
        setMessage({message: data.message, err: true});
      }else {
        setMessage({message:'Профиль успешно обновлён', err: false});
        mainApi.getUserProfile()
        .then(data=>{
          setCurrentUser(data)})
      }
    })
    .catch((e)=>{console.log(e)})
    .finally(() => setPreloader(false));
  };

  function likeCard(movie) {//добавить фильм
    setPreloader(true);
    mainApi.addMovie(movie)
    .then((data) => {
     setMoviesSavedList([data, ...moviesSavedList]);
     localStorage.setItem('savedMovies',JSON.stringify([data, ...moviesSavedList]));

    })
    .catch(err=>console.log(err))
    .finally(() => setPreloader(false));
  };

  function removeCard(movie) {
    setPreloader(true);
    mainApi.deleteMovie(movie)
    .then(()=>{
      const fiteredSavedmovies = moviesSavedList.filter(item=>{return (item._id!==movie)});
      setMoviesSavedList(fiteredSavedmovies);
      localStorage.setItem('savedMovies',JSON.stringify(fiteredSavedmovies));
    })
    .catch(err=>console.log(err))
    .finally(() => setPreloader(false));
  };

 function searchShortMovie(data, slider) {//поиск коротких фильмов
  if(slider) {
    const shortMovieList = data.filter(movie=>movie.duration<=40);
      setMessageForMoviesList(shortMovieList.length===0 ? 'Ничего не найдено' : '');
      return shortMovieList;
  } else {
   return data;
}}

  function filterMovies(data, list, slider) {//фильтр
      const foundCards = list.filter(movie=>{
        if(movie.nameRU.toLowerCase().trim().indexOf(data.toLowerCase())!==-1 || movie.nameEN.toLowerCase().indexOf(data.toLowerCase())!==-1) {
         return movie
        }
      });
        return searchShortMovie(foundCards,slider);
  };

  function searchMovie(data, slider) {//поиск фильмов
    if(data === '' || data == null ) {
      setMessageForMoviesList('Нужно ввести ключевое слово');
      localStorage.setItem('searchAllMovies',JSON.stringify([]));
      setSearchAllMovies([])
    }else if(data !== '') {
      setPreloader(true);
      const allMovies =JSON.parse(localStorage.getItem('AllMovies'));
      setMoviesList(allMovies)
        const result = filterMovies(data, moviesList, slider);
        setPreloader(false);
        setSearchAllMovies(result);
        setMessageForMoviesList(result.length===0 ? 'Ничего не найдено' : '');
        localStorage.setItem('searchAllMovies',JSON.stringify(result));
    };
  };

  function searchUserMovie(data, slider) {//поиск сохранённых фильмов
    setPreloader(true);
  if(data && data!==''){
    const result = filterMovies(data, moviesSavedList, slider);
    setSearchSavedMovies(result);
    setPreloader(false);
    setMessageForUserMoviesList(!result || result.length===0 ? 'Ничего не найдено' : '');
    localStorage.setItem('searchSavedMovies',JSON.stringify(result)); 
    } else if(data==='') {
      const resultSavedFilms = searchShortMovie(moviesSavedList, slider);
      setSearchSavedMovies(resultSavedFilms);
      setPreloader(false);
      setMessageForUserMoviesList(resultSavedFilms.length===0 ? 'Ничего не найдено' : '');
    };
};

  useEffect(()=>{//загрузка фильмов 
    if(isLoggedIn){
      setPreloader(true);
      mainApi.getMovies()
      .then(data=>{
        localStorage.setItem('savedMovies',JSON.stringify(data.data));
        setMoviesSavedList(data.data);
      })
      .catch(err=>console.log(err))
      .finally(() => setPreloader(false));
      moviesApi.getApiMovies()
      .then(res=>{
        localStorage.setItem('AllMovies',JSON.stringify(res));
        setMoviesList(res);
        })
      .catch(err=>console.log(err))
      .finally(() => setPreloader(false));
    }},[currentUser,isLoggedIn]);

    useEffect(() => {
      if (localStorage.getItem('AllMovies')) {
        const movies = JSON.parse(localStorage.getItem('AllMovies'));
        setMoviesList(movies);
      }
    }, [currentUser]);

useEffect(()=>{//информация о пользователе
  const pathName = location.pathname;
  mainApi.getUserProfile()
      .then(data=>{
        if(!data.message){
          setIsLoggedIn(true);
          history.push(pathName);
          setIsOpen(true);
          setErrServer('');
          setCurrentUser(data);
          setUserId(data._id);
          setMessage({});
      };
      })
      .catch(err=>{setIsLoggedIn(false);console.log(err)});
  },[isLoggedIn]);

  function handleRegister({ name, email, password }) {
    authorization(name, email, password)
      .then(() => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        setErrServer('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleLogin({ email, password }) {
    login(email, password)
      .then(() => {
        setIsLoggedIn(true)
        history.push('/movies')
      })
      .catch((err) => {
        setErrServer('Что-то пошло не так...')
        console.log(err.message)
      })
  }


  function handleSignOut() {
    signout()
      .then(() => {
        setIsLoggedIn(false)
        history.push('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>

          <Route exact path='/'>
            <Header loggedIn={!isLoggedIn} />
            <Main />
          </Route>

          <Route exact path="/movies">
            <Header loggedIn={isLoggedIn} />
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              cards={moviesSavedList}
              compoment={Movies}
              closeMenu = {closeMenu} 
              isMenuOpen ={isMenuOpen} 
              errServer = {errServer} 
              loggedIn={isLoggedIn}
              likeCard={likeCard}
              removeCard={removeCard}
              userId={userId} 
              searchAllMovies={searchAllMovies}
              searchMovie={searchMovie}
              messageForMoviesList={messageForMoviesList}
              preloader={preloader}>
            </ProtectedRoute>
          </Route>

          <Route exact path="/saved-movies">
            <Header loggedIn={isLoggedIn} />
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              cards={moviesSavedList}
              compoment={SavedMovies}
              closeMenu = {closeMenu} 
              isMenuOpen ={isMenuOpen} 
              errServer = {errServer} 
              loggedIn={isLoggedIn}
              removeCard={removeCard}
              userId={userId} 
              searchAllMovies={searchSavedMovies}
              searchMovie={searchUserMovie}
              messageForMoviesList={messageForUserMoviesList}
              preloader={preloader}>
            </ProtectedRoute>
          </Route>

          <Route path='/signup'>
            <Register handleRegister={handleRegister}  errServer={errServer} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin}  errServer={errServer} />
          </Route>

          <Route exact path="/profile">
            <Header loggedIn={isLoggedIn} />
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              compoment={Profile}
              handleEditProfile={onUpdateUser}
              onSingOut={handleSignOut} >
            </ProtectedRoute>
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
