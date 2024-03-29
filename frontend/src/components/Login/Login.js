import './Login.css'
import AuthForm from '../AuthForm/AuthForm';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ title, textButton, onLogin, errorServer}) {
  const { values, handleChange, errors, isValid,  } = useFormWithValidation({})

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <main>
      <AuthForm
        nameEmail="email"
        namePassword="password"
        title={title}
        textButton={textButton}
        onSubmit={handleSubmit}
        onChange={handleChange}
        emailValue={values.email}
        passwordValue={values.password}
        error={errors}
        isValid={isValid}
        errorServer={errorServer}
      />
      <div className='formregister'>
        <p className='formregister__item'>Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className='formregister__item formregister__item_link'>
            Регистрация
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;