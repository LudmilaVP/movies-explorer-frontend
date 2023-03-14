import React, { useState } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function SearchForm({
  searchAllMovies,
  searchSaveMovies,
  checkbox,
  setCheckbox,
  searchValue,
}) {
  const [value, setValue] = useState(searchValue);
  const { pathname } = useLocation();

  useEffect(() => {});

  const toggleClick = () => {
    setCheckbox(!checkbox);
  };

  const heandleSearchClick = (e) => {
    e.preventDefault();

    if (pathname === "/movies") {
      searchAllMovies(value);
    }
    if (pathname === "/saved-movies") {
      searchSaveMovies(value);
    }
  };

  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" type="text"
            placeholder="Фильм"
            required
            onChange={(event) => setValue(event.target.value)}
            value={value} />
          <button className="search__button" type="submit" onClick={heandleSearchClick}></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input type="checkbox" name="shortFilms" className="search__checkbox" onClick={toggleClick}/>
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