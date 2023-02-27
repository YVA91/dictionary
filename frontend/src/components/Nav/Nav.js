import './Nav.css'
import { Link } from 'react-router-dom';

function Nav() {


  return (
    <>
      <section className="nav">
        <Link to="/signup" className="nav__link">
          <p className="nav__link-text">Регистрация</p>
        </Link>
        <Link to="/signin" className="nav__link">
          <p className="nav__link-text">Войти</p>
        </Link>
        <Link to="#" className="nav__link">
          <p className="nav__link-text">О проекте</p>
        </Link>
      </section>
    </>
  )
}
export default Nav;