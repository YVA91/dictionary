import './AuthForm.css';
import { Route } from 'react-router-dom';

function AuthForm({ textButton, title, onChange, nameValue, nameName, emailValue, nameEmail, passwordValue, namePassword, onSubmit }) {

  return (
    <form className='authform' onSubmit={onSubmit} noValidate>
      <h2 className='authform__title'>{title}</h2>
      <Route exact path="/signup">
        <label className="authform__field">
          <span className="authform__field-signature">Имя</span>
          <input
            className="authform__field-item"
            id="name"
            type="text"
            required
            minLength="2"
            placeholder=""
            value={nameValue || ""}
            onChange={onChange}
            name={nameName}
            pattern="^[A-Za-zА-Яа-яЁё/s][A-Za-zА-Яа-яЁё /s -]+$"
          />
          <span className="authform__field-item-error"></span>
        </label>
      </Route>
      <label className="authform__field">
        <span className="authform__field-signature">E-mail</span>
        <input
          className="authform__field-item"
          id="email"
          type="email"
          required
          minLength="2"
          placeholder=""
          value={emailValue || ""}
          onChange={onChange}
          name={nameEmail}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"

        />
        <span className="authform__field-item-error"></span>
      </label>
      <label className="authform__field">
        <span className="authform__field-signature">Пароль</span>
        <input
          className="authform__field-item"
          id="password"
          type="password"
          required
          minLength="2"
          placeholder=""
          value={passwordValue || ""}
          onChange={onChange}
          name={namePassword}
        />
        <span className="authform__field-item-error"></span>
      </label>
      <span className="authform__button-error"></span>
      <div className='authform__button-contanier'>
        <button className='authform__button' type="submit">{textButton}</button>
      </div>
    </form>
  );
}

export default AuthForm;