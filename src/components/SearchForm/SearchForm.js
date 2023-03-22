import './SearchForm.css';
import { useEffect, useState } from 'react';

const SearchForm = ({ handleGetMovies, moviesTumbler, moviesInputSearch, handleGetMoviesTumbler }) => {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleGetMovies(inputSearch);
  }

  function handleTumblerChange() {
    const newTumbler = !tumbler;
    setTumbler(newTumbler);
    handleGetMoviesTumbler(newTumbler);
  }

  function handleInputChange(e) {
    setInputSearch(e.target.value);
  }

  useEffect(() => {
    setTumbler(moviesTumbler);
    setInputSearch(moviesInputSearch);
  }, [moviesTumbler, moviesInputSearch]);

  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" placeholder="Фильм" type="text" value={inputSearch || ''} onChange={handleInputChange} required/>
          <button className="search__button" onClick={handleSubmit} type="submit"></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input className="search__checkbox" type="checkbox" value={tumbler} checked={tumbler} onChange={handleTumblerChange}/>
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;