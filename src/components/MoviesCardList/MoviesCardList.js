import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  if (props.isLoading) return <Preloader />
  if (props.serverError) return <span className="movies__error">Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
  if (props.cards.length === 0) return <span className="movies__error">Ничего не найдено</span>

  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.cards.map(card => {
          return (
            <MoviesCard
              key={props.isAlreadySaved ? card.movieId : card.id}
              card={card}
              onMovieSave={props.onMovieSave}
              onMovieDelete={props.onMovieDelete}
              isSaved={props.isSaved}
              isAlreadySaved={props.isAlreadySaved}
            />
          )
        })
        }
      </ul>

      {props.isAlreadySaved ? '' :
        (props.cards.length < foundMovies.length ?
          <div className="movies__container">
            <button className="movies__button" type="button" name="more" onClick={props.handleShowMore}>Ещё</button>
          </div> : '')}
    </section>
  );
};

export default MoviesCardList;