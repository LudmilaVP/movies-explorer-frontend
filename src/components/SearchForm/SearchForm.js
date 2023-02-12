import "./SearchForm.css";

const SearchForm = () => {
    <section className="search">
        <div className="search__container">
            <form className="search__form">
                <div className="search__icon"></div>
                <input className="search__input" placeholder="Фильм" type="text" required />
                <button type="submit" className="search__button">Найти</button>
            </form>
            <div className="search__toggle">
                <label className="search__tumbler">
                    <input className="search__checkbox" type="checkbox" />
                    <span className="search__slider" />
                </label>
                <p className="search__films">Короткометражки</p>
            </div>
            <div className="search__border-bottom"></div>
        </div>
    </section >
};

export default SearchForm;