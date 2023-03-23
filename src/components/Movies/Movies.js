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
                    handleShowMore={props.handleShowMore}
                    isSaved={props.isSaved}
                    isAlreadySaved={false}
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