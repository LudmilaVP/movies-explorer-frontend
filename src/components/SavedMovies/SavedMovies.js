import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';

const SavedMovies = ({ messageError }) => {
  const [movies, setMovies] = useState(null);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesShowed, setMoviesShowed] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  

  async function savedMoviesToggle(movie, like) {
    if (!like) {
      try {
        await mainApi.deleteMovie(movie._id);
        const newMovies = await mainApi.getMovies();
        setMoviesShowed(newMovies);
        setMovies(newMovies);
      } catch (err) {
        messageError('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  async function handleGetMovies(inputSearch, tumbler) {
    setPreloader(true);
    setErrorText('');
    
    try {
      const data = movies;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);

      setMoviesShowed(filterData);

      if (inputSearch) {
        localStorage.setItem('savedMoviesInputSearch', inputSearch);
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesTumbler', tumbler);
      } else {
        localStorage.removeItem('savedMoviesInputSearch');
      localStorage.removeItem('savedmovies');
      localStorage.removeItem('savedMoviesTumbler');
      }
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('savedMoviesInputSearch');
      localStorage.removeItem('savedmovies');
      localStorage.removeItem('savedMoviesTumbler');
      
    } finally {
      setPreloader(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const localStorageMovies = localStorage.getItem('savedMovies');
    if (localStorageMovies) {
      setMovies(JSON.parse(localStorageMovies));
      const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');
      const localStorageMoviesTumbler = localStorage.getItem('savedMoviesTumbler');

      if (localStorageMoviesInputSearch) {
        setMoviesInputSearch(localStorageMoviesInputSearch);
      }
      if (localStorageMoviesTumbler) {
        setMoviesTumbler(localStorageMoviesTumbler === 'true');
      }
    } else {
      try {
        const data = await mainApi.getMovies();
        setMoviesShowed(data);
        setMovies(data);
      } catch (err) {
        messageError(`Ошибка сервера ${err}`);
      }
    }
  }, [messageError]);

  return (
    <div className="movies__saved">
      <SearchForm handleGetMovies={handleGetMovies} moviesTumbler={moviesTumbler} moviesInputSearch={moviesInputSearch} />
      {preloader && <Preloader />}
      {errorText && <div className="movie__saved_error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList moviesRemains={[]} savedMoviesToggle={savedMoviesToggle} movies={moviesShowed} />
      )}
    </div>
  );
};

export default SavedMovies;