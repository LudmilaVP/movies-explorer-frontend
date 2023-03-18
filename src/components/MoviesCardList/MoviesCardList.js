import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ films, savedMoviesToggle, filmsSaved, filmsRemains, handleMore }) => {
  const { pathname } = useLocation();

  return (
    <section className="movies">
      {films.length > 0 ? (
        <ul className="movies__list">
          {films.map((film) => (
            <MoviesCard
              key={film.id || film.movieId}
              film={film}
              savedMoviesToggle={savedMoviesToggle}
              filmsSaved={filmsSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="movies__text">Ничего не найдено</div>
      )}

      {filmsRemains.length > 0 && pathname !== '/saved-movies' && (
        <div className="movies__button-container">
          <button className="movies__button" type="button" name="more" onClick={handleMore}>Ещё</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;