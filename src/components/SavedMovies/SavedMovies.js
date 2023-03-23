import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies(props) {

  const [filteredMovies, setFilteredMovies] = useState([])

  function initFilteredMovies() {
    setFilteredMovies(props.cards)
  }

  useEffect(() => {
    setFilteredMovies(
      filteredMovies.filter(movie => props.cards.some(card => movie.movieId === card.movieId))
    )
  }, [props.cards])

  function handleSearchMovie(movieName, isShortFilms) {
    const filteredMovies = props.cards.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFilteredMovies(filteredMovies)
    }
  }

  useEffect(() => {
    initFilteredMovies()
  }, [])

  return (
    <div className="movies-saved">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        defaultValue=""
      />
      <MoviesCardList
        cards={filteredMovies}
        isSaved={props.isSaved}
        isAlreadySaved={true}
        onMovieDelete={props.onMovieDelete}
        serverError={props.serverError}
        isLoading={props.isLoading}
      />
    </div>
  );
};

export default SavedMovies;