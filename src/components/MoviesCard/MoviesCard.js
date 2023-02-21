import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MoviesCard = ({ movie, savedMoviesToggle, moviesSaved }) => {
  const [saved, setSaved] = useState(false);
  const { pathname } = useLocation();

  function handleSavedMovie() {
    const newSaved = !saved;
    const savedMovie = moviesSaved.filter((obj) => {
      return obj.movieId == movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newSaved);
  }

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  function handleFavoriteDelete() {
    savedMoviesToggle(movie, false);
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovie = moviesSaved.filter((obj) => {
        return obj.movieId == movie.id;
      });

      if (savedMovie.length > 0) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [pathname, moviesSaved, movie.id]);

  return (
    <li className="movie">
      <div className="movie__container" href={pathname === '/saved-movies' ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
        <img src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className="movie__image"></img>
        <p className="movie__title">{movie.nameRU}</p>
        <div className="movie__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" onClick={handleFavoriteDelete} />
          ) : (
            <button
              type="button"
              className={`movie__button movie__button${saved ? '_active' : '_inactive'}`}
              onClick={handleSavedMovie}
            />
          )}
        </div>
      </div>
      <p className="movie__duration">{getMovieDuration(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;