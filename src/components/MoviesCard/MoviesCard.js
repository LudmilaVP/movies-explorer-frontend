import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, id, movieId, nameRU, nameEN, clickCard, removeCard, cards }) {

  const location = useLocation();
  const [statusSaved, setStatusSaved] = React.useState();

  const buttonCardClass = `movie__button ${statusSaved? "movie__button_active" : "movie__button_inactive"}`
  const buttonCardContentTitle = <button className='movie__button movie__button_inactive'>Сохранить</button>;
  const buttonCardContentSave = <button className='movie__button movie__button_active'/>;
  const buttonCardContentRemove = <button className='movie__button movie__button_delete'/>;
  const time = Math.trunc(duration / 60) ? `${Math.trunc(duration / 60)}ч ${duration % 60}м` : `${duration}м`;
  
  function getCard() {
    if(statusSaved) {
      setStatusSaved(false);
      removeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, id, movieId, nameRU, nameEN });
    }else {
      setStatusSaved(true);
      clickCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, id, movieId, nameRU, nameEN });
    }
  };

  function removeSavedFilm() {
      clickCard(id);
  };

  React.useEffect(()=>{
    setStatusSaved(JSON.parse(localStorage.getItem('savedMovies')).some(item=>item.movieId === movieId));
  },[]);


  return (
    <li className="movie">
      <div className="movie__container" href={trailerLink} rel="noreferrer" target="_blank">
        <img src={image} alt="Постер" className="movie__image"></img>
        <p className="movie__title">{nameRU}</p>
        <div className="movie__buttons">
        {location.pathname === '/saved-movies' && (
        <button className='movie__button movie__button_delete' onClick={removeSavedFilm}>{buttonCardContentRemove}
        </button>
      )}
      {location.pathname === '/movies' && (
        <button className={buttonCardClass} onClick={getCard}>{statusSaved ? buttonCardContentSave : buttonCardContentTitle}
        </button>
      )}
        </div>
      </div>
      <p className="movie__duration">{time}</p>
    </li>
  );
};

export default MoviesCard;