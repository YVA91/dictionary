import './Nav.css'
import { Route, Link } from 'react-router-dom';

function Nav() {


  return (
    <>
      <section className="nav">
        <div className="nav__contanierUp">
          <Link to="/signup" className="nav__link">
            <p className="nav__link-text">Регистрация</p>
            </Link>
          <Link to="/signin" className="nav__link">
          <p className="nav__link-text">Войти</p>
          </Link>
        </div>
        <div className="nav__contanierDown">
          <Link to="#" className="nav__link"> <p className="nav__link-text">О проекте</p></Link>
        </div>
      </section>
    </>
  )
}
export default Nav;