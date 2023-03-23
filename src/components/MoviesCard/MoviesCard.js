import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = (props) => {
  const nameRu = props.card.nameRU
  const poster = props.isOnlySaved ? props.card.image : `https://api.nomoreparties.co/${props.card.image.url}`
  const trailerLink = props.card.trailerLink
  const { pathname } = useLocation();

  const duration = () => {
    if (props.card.duration > 60) {
      return (props.card.duration / 60 | 0) + "ч " + props.card.duration % 60 + "м"
    }
    if (props.card.duration === 60) {
      return (props.card.duration / 60) + "ч"
    } else {
      return props.card.duration + "м"
    }
  }

  function handleCardSave(props) {
    if (!props.isSaved) {
      props.onCardSave(props.card)
      } else {props.onCardDelete(props.card)
  }
}

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="movie">
      <div className="movie__container" href={trailerLink} rel="noreferrer" target="_blank">
        <p className="movie__title">{nameRu}</p>
        <p className="movie__duration">{duration()}</p>
        <div className="movie__buttons">

        {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" onClick={handleCardDelete} />
          ) : (
            <button type="button" className={`movie__button movie__button${!props.isSaved ? '_active' : '_inactive'}`} onClick={handleCardSave} />
          )}

                </div>
        <img src={poster} alt="Постер" className="movie__image"></img>
      </div>
    </li>
  );
};

export default MoviesCard;
