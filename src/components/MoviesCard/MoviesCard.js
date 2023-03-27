import './MoviesCard.css';
import React from 'react';

function MoviesCard(props) {
  const image = props.isOnlySaved ? props.card.image : `https://api.nomoreparties.co/${props.card.image.url}`
  const trailerLink = props.card.trailerLink
  function handleMovieSave() {
    props.onMovieSave(props.card)
  }

  function handleMovieDelete() {
    props.onMovieDelete(props.card)
  }

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

  return (
    <li className="movie">
      <div className="movie__container">
        <p className="movie__title">{props.card.nameRU}</p>
        <p className="movie__duration">{duration()}</p>
        <div className="movie__buttons">

          {props.isAlreadySaved ? <button className="movie__button movie__button_delete" onClick={handleMovieDelete} type="button"></button> :
            (props.isSaved(props.card) ? <button className="movie__button movie__button_active" onClick={handleMovieDelete} type="button"></button> :
              <button className="movie__button movie__button_inactive" onClick={handleMovieSave} type="button"></button>)}

        </div>
        <a className="movie__trailer" href={trailerLink} rel="noreferrer" target="_blank">
          <img src={image} alt="Постер" className="movie__image"></img>
        </a>
      </div>
    </li>
  );
};

export default MoviesCard;
