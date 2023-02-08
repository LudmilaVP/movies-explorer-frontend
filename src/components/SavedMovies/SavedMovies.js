import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/savedMovies.js';

const SavedMovies = () => {
  return (
    <div className="movies-saved">
      <SearchForm />
      <MoviesCardList 
      cards={savedMovies} 
      buttonMore={false} />
    </div>
  );
};

export default SavedMovies;