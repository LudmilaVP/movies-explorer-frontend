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
                    isSaved={props.isSaved}
                    isOnlySaved={false}
                    handleMore={props.handleMore}
                    onCardSave={props.onCardSave}
                    onCardDelete={props.onCardDelete}
                    serverError={props.serverError}
                    isLoading={props.isLoading}
                />
            </div>
        </>
    );
}

export default Movies;