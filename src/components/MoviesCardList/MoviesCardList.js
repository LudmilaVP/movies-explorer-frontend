import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  if (props.loading) return <Preloader />
  if (props.cards.length === 0) return <span className="movies__text">Ничего не найдено</span>
  if (props.serverError) return <span className="movies__text">Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>

  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))


  return (
    <section className="movies">
      <ul className="movies__list">
        {props.cards.map(card => {
          return (
            <MoviesCard
              key={props.savedMoviesToggle ? card.movieId : card.id}
              card={card}
              savedMoviesToggle={props.savedMoviesToggle}
              moviesSaved={props.moviesSaved}
              onCardSave={props.onCardSave}
              onCardDelete={props.onCardDelete}
            />
          )
        })
        }
      </ul>

      {props.savedMoviesToggle ? '' :
        (props.cards.length < foundMovies.length ?
          <div className="movies__container">
            <button className="movies__button" type="button" name="more" onClick={props.handleMore}>Ещё</button>
          </div> : '')}
    </section>
  );
};

export default MoviesCardList;