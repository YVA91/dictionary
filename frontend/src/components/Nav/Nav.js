import './Nav.css'
import { Route, Link } from 'react-router-dom';

function Nav() {


  return (
    <>
      <section className="nav">
        <div className="contanierUp">
          <Link to="#" className="nav__link">Регистрация</Link>
          <Link to="#" className="nav__link">Войти</Link>
        </div>
        <div className="contanierDown">
          <Link to="#" className="nav__link">О проекте</Link>
        </div>
      </section>
    </>
  )
}
export default Nav;