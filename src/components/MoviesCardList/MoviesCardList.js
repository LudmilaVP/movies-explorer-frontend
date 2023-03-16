import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css'

function MoviesCardList(props) {
  if (props.loading) return <Preloader />
  if (props.cards.length === 0) return <span className="movies__error">Ничего не найдено</span>
  if (props.serverError) return <span className="movies__error">Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>

  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))

  return (
    <>
      <section className="movies">
        {
          props.cards.map(card => {
            return (
              <MoviesCard
                card={card}
                key={props.isOnlySaved ? card.movieId : card.id}
                isSaved={props.isSaved}
                isOnlySaved={props.isOnlySaved}
                onCardSave={props.onCardSave}
                onCardDelete={props.onCardDelete}
              />
            )
          })
        }
      </section>
      {props.isOnlySaved ? '' :
        (props.cards.length < foundMovies.length ?
          <button className="movies__button" onClick={props.handleShowMore} type="button">Ещё</button> : '')}
    </>
  )
}

export default MoviesCardList