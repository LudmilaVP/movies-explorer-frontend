import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ film, savedMoviesToggle, filmsSaved }) => {
  const { pathname } = useLocation();
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteToogle() {
    savedMoviesToggle(film, favorite, setFavorite);
  }

  function handleFavoriteDelete() {
    savedMoviesToggle(film, false);
  }

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  useEffect(() => {
    filmsSaved.map((data) => {
      if (data.movieId === film.id) {
        setFavorite(true);
      }
    });
  }, [filmsSaved]);

  return (
    <li className="movie">
      <div className="movie__container" href={pathname === '/saved-movies' ? film.trailer : film.trailerLink} target="_blank" rel="noreferrer">
        <p className="movie__title">{film.nameRU}</p>
        <div className="movie__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" onClick={handleFavoriteDelete} />
          ) : (
            <button type="button" className={`movie__button movie__button${favorite ? '_active' : '_inactive'}`} onClick={handleFavoriteToogle} />
          )}
        </div>
        <p className="movie__duration">{getMovieDuration(film.duration)}</p>
        <img src={pathname === '/saved-movies' ? `${film.image}` : `https://api.nomoreparties.co${film.image.url}`} alt={film.nameRU} className="movie__image"></img>
      </div>
    </li>
  );
};

export default MoviesCard;