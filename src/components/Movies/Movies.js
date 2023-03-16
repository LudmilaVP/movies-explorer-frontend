import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './Movies.css'

function Movies(props) {
  return (
    <>
      <SearchForm
        handleSearch={props.handleSearch}
        defaultValue={props.defaultSearchValue}
      />
      <main className="movies__main">
        <MoviesCardList
          cards={props.cards}
          handleShowMore={props.handleShowMore}
          isSaved={props.isSaved}
          isOnlySaved={false}
          onCardSave={props.onCardSave}
          onCardDelete={props.onCardDelete}
          serverError={props.serverError}
          loading={props.loading}
        />
      </main>
    </>
  )
}

export default Movies
