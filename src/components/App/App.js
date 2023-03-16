import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { DURATION_MOVIES } from "../../utils/constants";

function App() {
  const [messageError, setMessageError] = useState('')
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);

  const [allMoviesList, setAllMoviesList] = useState(
    JSON.parse(localStorage.getItem("allMoviesList"))
  );

  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem("allMovies")) ?? []
  );
  const [allSaveMovies, setAllSaveMovies] = useState(
    JSON.parse(localStorage.getItem("saveMovies"))
  );

  const [filterMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem("filterMovies")) ?? []
  );
  const [filterSaveMovies, setFilterSaveMovies] = useState(
    JSON.parse(localStorage.getItem("filterSaveMovies"))
  );

  const [preloaderActive, setPreloaderActive] = useState(false);
  const [checkbox, setCheckbox] = useState(
    JSON.parse(localStorage.getItem("checkbox"))
  );
  const [searchValue, setSearchValue] = useState(
    JSON.parse(localStorage.getItem("searchValue")) ?? ""
  );

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserProfile()
        .then((data) => {
          setLoggedIn(true)
          setCurrentUser(data)
          getSaveMovies(data._id);
        })
        .catch((err) => {
          console.log(err)
        })
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
        setMessageError('Что-то пошло не так...')
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
        setMessageError('Что-то пошло не так...')
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

  useEffect(() => {
    if (!checkbox) {
      setMovies(allMovies);
      setSaveMovies(allSaveMovies);
      localStorage.setItem("checkbox", false);
    } else {
      setMovies(filterMovies);
      setSaveMovies(filterSaveMovies);
      localStorage.setItem("checkbox", true);
    }
  });

  const searchAllMovies = (value) => {
    setPreloaderActive(true);

    if (allMoviesList === null) {
      moviesApi
        .getApiMovies()
        .then((movies) => {
          localStorage.setItem("allMoviesList", JSON.stringify(movies));
          setAllMoviesList(movies);
          const moviesList = fitersMovies(movies, value);
          searchMovies(moviesList, value);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const moviesList = fitersMovies(allMoviesList, value);
      searchMovies(moviesList, value);
    }
  };

  const searchMovies = (moviesList, value) => {
    localStorage.setItem("searchValue", JSON.stringify(value));
    setSearchValue(value);
    localStorage.setItem("allMovies", JSON.stringify(moviesList));
    setAllMovies(moviesList);
    localStorage.setItem(
      "filterMovies",
      JSON.stringify(moviesList.filter((movie) => movie.duration <= DURATION_MOVIES))
    );
    setFilterMovies(moviesList.filter((movie) => movie.duration <= DURATION_MOVIES));
    setPreloaderActive(false);
  };

  const fitersMovies = (movies, value) => {
    return movies.filter((movie) => {
      if (value.length > 0) {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase());
      } else {
      }
    });
  };

  const getSaveMovies = (data) => {
    mainApi
      .getMovies()
      .then((movies) => {
        const moviesList = movies.filter((movie) => movie.owner === data);

        localStorage.setItem("saveMovies", JSON.stringify(moviesList));
        setAllSaveMovies(moviesList);

        localStorage.setItem(
          "filterSaveMovies",
          JSON.stringify(moviesList.filter((movie) => movie.duration <= DURATION_MOVIES))
        );
        setFilterSaveMovies(moviesList.filter((movie) => movie.duration <= DURATION_MOVIES));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchSaveMovies = (value) => {
    setPreloaderActive(true);
    const moviesList = JSON.parse(localStorage.getItem("saveMovies"));
    const filterMoviesList = fiterSaveMovies(moviesList, value);
    setAllSaveMovies(filterMoviesList);
    setFilterSaveMovies(
      filterMoviesList.filter((movie) => movie.duration <= DURATION_MOVIES)
    );
    setPreloaderActive(false);
  };

  const fiterSaveMovies = (movies, value) => {
    return movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(value.toLowerCase())
    );
  };
  const handleUpdateUser = (data) => {
    mainApi
      .setUserProfile(data)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMovieLike = (movie, setLike) => {
    const isLiked = saveMovies.some(
      (i) => i.movieId === movie.id || i.movieId === movie.movieId
    );
    if (!isLiked) {
      addMovies(movie, setLike);
    } else {
      deleteMovie(movie, setLike);
    }
  };

  const addMovies = (data, setLike) => {
    mainApi
      .addMovie(movieDataСonversion(data))
      .then((newMovie) => {
        setLike(true);
        setAllSaveMovies([newMovie.data, ...allSaveMovies]);
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([newMovie.data, ...allSaveMovies])
        );
        if (newMovie.data.duration < DURATION_MOVIES) {
          localStorage.setItem(
            "filterSaveMovies",
            JSON.stringify([newMovie.data, ...filterSaveMovies])
          );
          setFilterSaveMovies([newMovie.data, ...filterSaveMovies]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovie = (data, setLike) => {
    const d = allSaveMovies.filter((movie) => {
      if (movie.movieId === data.id || movie.movieId === data.movieId) {
        return movie;
      }
    });

    mainApi
      .deleteMovie(d[0]._id)
      .then(() => {
        setLike(false);
        localStorage.getItem(
          "filterSaveMovies",
          setFilterSaveMovies((state) =>
            state.filter((c) => c.movieId !== data.movieId)
          )
        );
        setFilterSaveMovies((state) =>
          state.filter((c) => c.movieId !== data.id)
        );
        setAllSaveMovies((state) => state.filter((c) => c.movieId !== data.id));
        localStorage.getItem(
          "saveMovies",
          setAllSaveMovies((state) =>
            state.filter((c) => c.movieId !== data.movieId)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const movieDataСonversion = (data) => {
    const movieData = {
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    };
    return movieData;
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>

          <Route exact path='/'>
            <Header loggedIn={!loggedIn} />
            <Main />
          </Route>

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/movies"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <Movies
                    searchAllMovies={searchAllMovies}
                    movies={movies}
                    onMovieLike={handleMovieLike}
                    loggedIn={loggedIn}
                    saveMovies={saveMovies}
                    checkbox={checkbox}
                    setCheckbox={setCheckbox}
                    preloaderActive={preloaderActive}
                    allMoviesList={allMoviesList}
                    searchValue={searchValue}
                  />
                </>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <SavedMovies
                    saveMovies={saveMovies}
                    onMovieLike={handleMovieLike}
                    searchSaveMovies={searchSaveMovies}
                    checkbox={checkbox}
                    setCheckbox={setCheckbox}
                    preloaderActive={preloaderActive}
                    allSaveMovies={allSaveMovies}

                  />
                </>
              }
            />

            <Route path='/signup'>
              <Register handleRegister={handleRegister} messageError={messageError} />
            </Route>

            <Route path='/signin'>
              <Login handleLogin={handleLogin} messageError={messageError} />
            </Route>

            <Route
              path="/profile"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <Profile
                    loggedIn={loggedIn}
                    handleEditProfile={handleUpdateUser}
                    handleSignOut={handleSignOut}
                  />
                </>
              }
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
