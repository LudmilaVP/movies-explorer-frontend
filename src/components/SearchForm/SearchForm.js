import { useState, useEffect } from 'react'
import './SearchForm.css'

function SearchForm(props) {
  const [movieName, setMovieName] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  function handleChangeMovieName(e) {
    setMovieName(e.target.value)
  }

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked
    setCheckbox(isShortFilms)
    props.handleSearch(movieName, isShortFilms)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleSearch(movieName, checkbox)
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
          <input className="search__input" value={movieName} onChange={handleChangeMovieName} type="text" name="movie" placeholder="Фильм" required />
          <button className="search__button" onSubmit={handleSubmit} type="submit"></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input className="search__checkbox" checked={checkbox} onChange={handleChangeCheckbox} type="checkbox" name="shortFilms"/>
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