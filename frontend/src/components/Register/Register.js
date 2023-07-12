/*import './Register.css'*/
import AuthForm from '../AuthForm/AuthForm';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation'

function Register({ textButton, title, onRegister, errorServer }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({})

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.email, values.password, values.name)
  }

  return (
    <main>
      <AuthForm
        textButton={textButton}
        nameEmail="email"
        namePassword="password"
        nameName="name"
        title={title}
        emailValue={values.email}
        passwordValue={values.password}
        nameValue={values.name}
        onSubmit={handleSubmit}
        onChange={handleChange}
        error={errors}
        isValid={isValid} 
        errorServer={errorServer}
        />
      <div className='formregister'>
        <p className='formregister__item'>Уже зарегистрированы?&nbsp;
          <Link to="/signin" className='formregister__item formregister__item_link'>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;