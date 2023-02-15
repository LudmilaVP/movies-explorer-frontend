import Form from '../Form/Form';

function Register() {
  return (
    <Form header="Добро пожаловать!" submit="Зарегистрироваться" title="Уже зарегистрированы?" link="Войти" path="/signin">
      <label className="form__item">
        <p className="form__item-text">Имя</p>
        <input type="text" className="form__field" placeholder="Людмила" required />
        <p className="form__error">Что-то пошло не так...</p>
      </label>

      <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input type="email" className="form__field form__field_right" placeholder="llv55a@yandex.ru" required />
        <p className="form__error">Что-то пошло не так...</p>
      </label>

      <label className="form__item">
        <p className="form__item-text">Пароль</p>
        <input type="password" className="form__field form__field_error" defaultValue="••••••••••••••" required />
        <p className="form__error form__error-display">Что-то пошло не так...</p>
      </label>
    </Form>
  );
}

export default Register;