import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;

    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис.')
    } else {
      input.setCustomValidity('');
    }

    if (name === 'email') {
      if (!isEmail(value)) {
          input.setCustomValidity('Некорректый адрес почты.');
      } else {
          input.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value }); // универсальный обработчик полей
    setIsValid(input.closest('form').checkValidity()); // проверка валидности
  };
  const resetForm = useCallback(
    (newValues = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
      setValues(newValues);
      setIsValid(newIsValid);
    },
    [setValues, setIsValid]
  );

  return { values, isValid, handleChange, resetForm, setIsValid };
}