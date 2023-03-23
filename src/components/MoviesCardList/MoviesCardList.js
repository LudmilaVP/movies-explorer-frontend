import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  if (props.loading) return <Preloader />
  if (props.cards.length === 0) return <span className="movies__error">Ничего не найдено</span>
  if (props.serverError) return <span className="movies__error">Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>

  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
  return (
    <section className="movies">
      <ul className="movies__list">
        {props.cards.map(card => {
          return (
            <MoviesCard
            card={card}
            key={props.isAlreadySaved ? card.movieId : card.id}
            isSaved={props.isSaved}
            isAlreadySaved={props.isAlreadySaved}
            onCardSave={props.onCardSave}
            onCardDelete={props.onCardDelete}
            />
          )
        })
        }
      </ul>

      {props.isAlreadySaved ? '' :
        (props.cards.length < foundMovies.length ?
          <div className="movies__container">
            <button className="movies__button" type="button" name="more" onClick={props.handleMore}>Ещё</button>
          </div> : '')}
    </section>
  );
};

export default MoviesCardList;