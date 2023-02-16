import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__header">Студент</h2>

      <div className="aboutme__container">
        <div className="aboutme__info">
          <h3 className="aboutme__name">Людмила</h3>
          <p className="aboutme__job">Фронтенд-разработчик, 28 лет</p>
          <p className="aboutme__description">
          Я живу в Буэнос-Айресе, закончила факультет экономики РАНХиГС. У меня есть муж и песик-корги. Я люблю слушать музыку, а ещё увлекаюсь рисованием. 
          Недавно начала кодить. С 2015 года работаю в компании ООО "Энергобыт Сервис"- семейный бизнес по ремонту котлов. 
          После того, как прошла курс веб-разработки, помогаю пилить сайт моей любимой компании и открыта для новых предложений по работе.
          </p>

          <ul className="aboutme__links">
            <li><a className="aboutme__link" href="https://github.com/LudmilaVP" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>

        <img src={avatar} alt="aboutme" className="aboutme__image" />
      </div>
    </section>
  );
};

export default AboutMe;