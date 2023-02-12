import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/movies';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList
                cards={cards}
                buttonMore={true} />
        </div>
    );
}

export default Movies;