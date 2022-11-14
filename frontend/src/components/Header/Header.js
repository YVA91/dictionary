import './Header.css';
import { Route } from 'react-router-dom';

function Header() {


  return (
    <>
      <section className="header">
        <h1 className="header__title">EasyWord</h1>
        <Route exact path={"/word"}>
          <div className="header__сontanier">
            <button className="header__button" type="button">Профиль</button>
            <button className="header__button" type="button">Выход</button>
          </div>
        </Route>
      </section>
    </>
  )
}
export default Header;