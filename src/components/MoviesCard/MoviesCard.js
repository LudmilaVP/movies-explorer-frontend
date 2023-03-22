import './MoviesCard.css';
import React from 'react';
import {Route} from 'react-router-dom';

const MoviesCard = (props) => {
  const nameRu = props.card.nameRU
  const poster = props.isOnlySaved ? props.card.image : `https://api.nomoreparties.co/${props.card.image.url}`
  const trailerLink = props.card.trailerLink

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

  function handleCardSave() {
    props.onCardSave(props.card)
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

        <Route path="/movies">
                    <button
                        className={props.isSaved ? "movie__button movie__button_active" : "movie__button_inactive"}
                        type="button"
                        onClick={handleCardSave}
                    >
                    </button>
                </Route>

                <Route path="/saved-movies">
                    <button
                        className="movie__button movie__button_delete"
                        type="button"
                        onClick={handleCardDelete}
                    />
                </Route>

                </div>
        <img src={poster} alt="Постер" className="movie__image"></img>
      </div>
    </li>
  );
};

export default MoviesCard;