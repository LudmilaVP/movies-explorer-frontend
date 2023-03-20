import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

const Movies = ({ messageError }) => {
  const [movies, setMovies] = useState(null);
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesCount, setMoviesCount] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState(null);
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([]);
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const moviesCountConfig = {
      '1200': [12, 4],
      '900': [9, 3],
      '768': [8, 2],
      '240': [5, 2],
    };

    Object.keys(moviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = moviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[1]));
    setMovies(spliceMovies);
    setMoviesShowed(newMoviesShowed);
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterData = [];
    let filterDataShowed = [];

    if (tumbler) {
      setMoviesWithTumbler(movies);
      setMoviesShowedWithTumbler(moviesShowed);
      filterData = movies.filter(({ duration }) => duration <= 40);
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40);
    } else {
      filterData = moviesWithTumbler;
      filterDataShowed = moviesShowedWithTumbler;
    }

    localStorage.setItem('movies', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('moviesTumbler', tumbler);
    setMovies(filterData);
    setMoviesShowed(filterDataShowed);
  }

  async function handleGetMovies(inputSearch) {
    localStorage.setItem('moviesTumbler', false);
    setMoviesTumbler(false);

    if (!inputSearch) {
      setErrorText('Нужно ввести ключевое слово');
      return false;
    }

    setPreloader(true);
    setErrorText('');

    try {
      const data = await moviesApi.getApiMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      localStorage.setItem('moviesInputSearch', inputSearch);
      localStorage.setItem('movies', JSON.stringify(filterData));

      const spliceData = filterData.splice(0, moviesCount[0]);

      setMoviesShowed(spliceData);
      setMoviesShowedWithTumbler(spliceData);
      setMovies(filterData);
      setMoviesWithTumbler(filterData);
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('moviesInputSearch');
      localStorage.removeItem('movies');
      localStorage.removeItem('moviesTumbler');
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movie, like) {
    if (like) {
      const objmovie = {
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailer: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        country: movie.country || 'Неизвестно',
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
      try {
        await mainApi.addMovie(objmovie);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        messageError('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovie(movie._id);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        messageError('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        messageError(`Ошибка сервера ${err}`);
      });

    const localStorageMovies = localStorage.getItem('movies');

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);

      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setPreloader(false);
      setMovies(filterData);
    }

    const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch');
    const localStorageMoviesTumbler = localStorage.getItem('moviesTumbler');

    if (localStorageMoviesTumbler) {
      setMoviesTumbler(localStorageMoviesTumbler === 'true');
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  }, [messageError]);
  
  return (

    <div className="movies__main">
      <SearchForm handleGetMovies={handleGetMovies} moviesTumbler={moviesTumbler} moviesInputSearch={moviesInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && moviesSaved !== null && moviesShowed !== null && (
        <MoviesCardList handleMore={handleMore} moviesRemains={movies} movies={moviesShowed} savedMoviesToggle={savedMoviesToggle} moviesSaved={moviesSaved} />
      )}
    </div>
  );
};

export default Movies;
