import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {

  return (
    <>
      <SearchForm
        defaultValue={props.defaultSearchValue}
        handleSearchMovie={props.handleSearchMovie}
      />
      <div className="movies__main">
        <MoviesCardList
          cards={props.cards}
          isSaved={props.isSaved}
          isAlreadySaved={false}
          handleShowMore={props.handleShowMore}
          onMovieSave={props.onMovieSave}
          onMovieDelete={props.onMovieDelete}
          serverError={props.serverError}
          isLoading={props.isLoading}
        />
      </div>
    </>
  );
}

export default Movies;