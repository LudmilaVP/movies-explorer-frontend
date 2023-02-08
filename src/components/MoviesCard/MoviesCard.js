import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ card }) => {
  const [saved, setSaved] = React.useState(false);

  function handleSavedMovie() {
    setSaved(!saved);
  }

  const { pathname } = useLocation();

  return (
    <li className="movie">
      <img src={card.image} alt={card.title} className="movie__image"></img>
      <div className="movie__container">
        <p className="movie__title">{card.title}</p>
        <div className="movie__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" />
          ) : (
            <button
              type="button"
              className={`movie__button movie__button${saved ? '_active' : '_inactive'}`}
              onClick={handleSavedMovie}
            />
          )}
        </div>
      </div>
      <p className="movie__duration">{card.duration}</p>
    </li>
  );
};

export default MoviesCard;