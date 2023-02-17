import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
import mainApi from '../../utils/MainApi';
import React, { useEffect, useState } from 'react';

function SavedMovies() {
  const [movies, setMovies] = useState([])
  const [moviesShowed, setMoviesShowed] = useState([])
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([])
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([])
  const [moviesTumbler, setMoviesTumbler] = useState(false)
  const [moviesInputSearch, setMoviesInputSearch] = useState('')

  const [preloader, setPreloader] = useState(false)
  const [errorText, setErrorText] = useState('')

  function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = []
    let filterData = []

    if (tumbler) {
      setMoviesShowedWithTumbler(moviesShowed)
      setMoviesWithTumbler(movies)
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40)
      filterData = movies.filter(({ duration }) => duration <= 40)
    } else {
      filterDataShowed = moviesShowedWithTumbler
      filterData = moviesWithTumbler
    }
    setMoviesShowed(filterDataShowed)
    setMovies(filterData)
  }

  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText('')
    setPreloader(true)
    localStorage.setItem('savedMoviesInputSearch', inputSearch)
    localStorage.setItem('savedMoviesTumbler', tumbler)
    try {
      const data = movies
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()))

      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40)
      setMoviesShowed(filterData)
    } catch (err) {
      setErrorText(`Произошла ошибка - ${err}`)
      setMovies([])

    } finally {
      setPreloader(false)
    }
  }

  async function savedMoviesToggle(movie, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovie(movie._id)
        const newMovies = await mainApi.getMovies()
        setMoviesShowed(newMovies)
        setMovies(newMovies)
      } catch (err) {
        console.log(`Произошла ошибка - ${err}`)
      }
    }
  }

  useEffect(() => {
    const localStorageMovies = localStorage.getItem('savedMovies')

    if (localStorageMovies) {
      setMovies(JSON.parse(localStorageMovies));
      const localStorageMoviesTumbler = localStorage.getItem('savedMoviesTumbler')
      const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');
      if (localStorageMoviesTumbler) {
        setMoviesTumbler(localStorageMoviesTumbler === 'true')
      }
      if (localStorageMoviesInputSearch) {
        setMoviesInputSearch(localStorageMoviesInputSearch);
      }
    } else {
      mainApi.getMovies()
        .then(data => {
          setMovies(data)
          setMoviesShowed(data)
        })
        .catch(err => console.log(`Произошла ошибка - ${err}`))
    }
  }, [])

  return (
    <div className="movies-saved">
      <SearchForm
        handleGetMovies={handleGetMovies}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
      />
      {preloader && <Preloader />}
      {errorText && <div className="movies-saved__error">{errorText}</div>}
      <MoviesCardList
        moviesStay={[]}
        savedMoviesToggle={savedMoviesToggle}
        movies={moviesShowed}
      />
    </div>
  );
};

export default SavedMovies;