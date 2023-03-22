import './MoviesCard.css';
import React from 'react';

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
        <img src={poster} alt="Постер" className="movie__image"></img>
        <p className="movie__title">{nameRu}</p>
        <div className="movie__buttons">
          {props.isOnlySaved ? <button type="button" className="movie__button movie__button_delete" onClick={handleCardDelete} /> :
            (props.isSaved(props.card) ? <button type="button" className="movie__button movie__button_active" onClick={handleCardDelete}></button> :
              <button className="movie__button movie__button_inactive" onClick={handleCardSave} type="button">Сохранить</button>)}
        </div>
      </div>
      <p className="movie__duration">{duration()}</p>
    </li>
  );
};

export default MoviesCard;