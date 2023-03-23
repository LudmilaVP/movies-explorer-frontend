import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([])

  function handleSearch(movieName, isShortFilms) {
    const filteredMovies = props.cards.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFilteredMovies(filteredMovies)
    }
  }

  function initFilteredMovies() {
    setFilteredMovies(props.cards)
  }

  useEffect(() => {
    setFilteredMovies(
      filteredMovies.filter(movie => props.cards.some(card => movie.movieId === card.movieId))
    )
  }, [props.cards])

  useEffect(() => {
    initFilteredMovies()
  }, [])

  return (
    <div className="movies-saved">
      <SearchForm
        handleSearch={handleSearch}
        defaultValue=""
      />
      <MoviesCardList
        cards={filteredMovies}
        isSaved={props.isSaved}
        isOnlySaved={true}
        onCardDelete={props.onCardDelete}
        serverError={props.serverError}
        isLoading={props.isLoading}
      />
    </div>
  );
};

export default SavedMovies;