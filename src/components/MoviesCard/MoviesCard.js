import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie, onMovieLike, saveMovies}) {
  const [like, setLike] = useState(false);
  const { pathname } = useLocation();

  const convertToHours = (mins) => {
    return `${Math.trunc(mins / 60)}ч ${mins % 60}м`;
  };

  useEffect(() => {
    saveMovies.map((data) => {
      if (data.movieId === movie.id) {
        setLike(true);
      }
    });
  }, [saveMovies]);

  const handleLikeClick = () => {
    //setLike(!like)
    onMovieLike(movie, setLike, like);
  };


  return (
    <li className="movie">
      <div className="movie__container" href={movie.trailerLink} rel="noreferrer" target="_blank">
        <img src={pathname === "/saved-movies"
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`} alt="Постер" className="movie__image"></img>
        <p className="movie__title">{movie.nameRU}</p>
        <div className="movie__buttons">
        <button
          className={`${
            pathname === "/saved-movies" ? "movie__button_delete" : ""
          } movie__button ${
            like ? "movie__button_active" : "movie__button_inactive"
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
        </div>
      </div>
      <p className="movie__duration">{convertToHours(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;