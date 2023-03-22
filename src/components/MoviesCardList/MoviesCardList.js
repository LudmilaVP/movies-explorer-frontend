import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, savedMoviesToggle, moviesSaved, moviesRemains, handleMore }) => {
  const { pathname } = useLocation();

  return (
    <section className="movies">
      {movies.length > 0 ? (
        <ul className="movies__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMoviesToggle={savedMoviesToggle}
              moviesSaved={moviesSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="movies__text">Ничего не найдено</div>
      )}

      {moviesRemains.length > 0 && pathname !== '/saved-movies' && (
        <div className="movies__button-container">
          <button className="movies__button" type="button" name="more" onClick={handleMore}>Ещё</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;