import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList  
      buttonMore={true} />
    </div>
  );
}

export default Movies;