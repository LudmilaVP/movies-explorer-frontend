import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie, savedMoviesToggle, moviesSaved }) => {
  const [like, setLike] = useState(false);
  const { pathname } = useLocation();

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }
  
  function handleLikeDelete() {
    savedMoviesToggle(movie, false);
  }
  
  function handleLikeToogle() {
    const newLike = !like;
    const savedMovie = moviesSaved.filter((obj) => {
      return obj.movieId === movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newLike);
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovie = moviesSaved.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovie.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [pathname, moviesSaved, movie.id]);

  return (
    <li className="movie">
      <div className="movie__container" href={pathname === '/saved-movies' ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
        <p className="movie__title">{movie.nameRU}</p>
        <div className="movie__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" onClick={handleLikeDelete} />
          ) : (
            <button type="button" className={`movie__button movie__button${like ? '_active' : '_inactive'}`} onClick={handleLikeToogle} />
          )}
        </div>
        <p className="movie__duration">{getMovieDuration(movie.duration)}</p>
        <img src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className="movie__image"></img>
      </div>
    </li>
  );
};

export default MoviesCard;