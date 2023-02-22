import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {

    return (
        <>
            <SearchForm
                handleSearch={props.handleSearch}
                defaultValue={props.defaultSearchValue}
            />
            <div className="movies__main">
                <MoviesCardList
                    cards={props.cards}
                    handleMore={props.handleMore}
                    saveMovies={props.saveMovies}
                    savedMoviesToggle={props.savedMoviesToggle}
                    onCardSave={props.onCardSave}
                    onCardDelete={props.onCardDelete}
                    serverError={props.serverError}
                    loading={props.loading}
                />
            </div>
        </>
    );
}

export default Movies;