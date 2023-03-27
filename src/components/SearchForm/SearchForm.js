import "./SearchForm.css";
import { useEffect, useState } from 'react';

function SearchForm(props) {

  const [movieName, setMovieName] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked
    setCheckbox(isShortFilms)
    props.handleSearchMovie(movieName, isShortFilms)
  }

  function handleChangeNameMovie(e) {
    setMovieName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleSearchMovie(movieName, checkbox)
  }

  useEffect(() => {
    setMovieName(props.defaultValue)
    setCheckbox(JSON.parse(localStorage.getItem('shortFilms')) || false)
  }, [])

  return (
    <section className="search" onSubmit={handleSubmit}>
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" placeholder="Фильм" type="text" value={movieName} onChange={handleChangeNameMovie} required />
          <button className="search__button" type="submit" onClick={handleSubmit}></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input type="checkbox" name="shortFilms" className="search__checkbox" checked={checkbox} onChange={handleChangeCheckbox} />
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