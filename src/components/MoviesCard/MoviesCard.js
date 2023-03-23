import './MoviesCard.css';
import React from 'react';

function MoviesCard(props) {
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

        {props.isOnlySaved ? <button className="movie__button_delete hover-button" onClick={handleCardDelete} type="button"></button> :
          (props.isSaved(props.card) ? <button className="movie__button movie__button_saved hover-button" onClick={handleCardDelete} type="button"></button> :
            <button className="movie__button movie__button_save hover-button" onClick={handleCardSave} type="button">Сохранить</button>)}

                </div>
        <img src={poster} alt="Постер" className="movie__image"></img>
      </div>
    </li>
  );
};

export default MoviesCard;
