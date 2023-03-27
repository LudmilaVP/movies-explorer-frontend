import './Footer.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';


const Footer = () => {

  const endpoints = [
    "/",
    "/movies",
    "/saved-movies",
  ]

  const [date, setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear())
  useEffect(() => {
    getYear();
  }, [])

  return (
    <Route exact path={endpoints}>
      <footer className="footer">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__container">
          <p className="footer__copyright">&copy; {date}</p>

          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a className="footer__nav-link" href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
              </li>
              <li className="footer__nav-item">
                <a className="footer__nav-link" href="https://github.com/LudmilaVP/" target="_blank" rel="noreferrer">Github</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </Route>
  );
};

export default Footer;