import './SearchForm.css';

const SearchForm = () => {
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" required />
        <button type="submit" className="search__button">Найти</button>
      </div>
      <div className="search__toggle">
        <p className="search__films">Короткометражки</p>
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" /> 
          <span className="search__slider" />
        </label>
      </div>
    </form>
};

export default SearchForm;