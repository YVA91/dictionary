import './Header.css';
import { Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header({onExit}) {
  const currentUser = useContext(CurrentUserContext);


  return (
    <>
      <section className="header">
        <Link to="/word" className="header__title-link">
          <h1 className="header__title">EasyWord</h1>
        </Link>
        <Route exact path={["/word", "/IrregularVerbs"]}>
          <h2 className="header__profile-name">Привет, {currentUser.name}!</h2>
          <div className="header__сontanier">
            <Link to="/profile" className="header__button">Профиль</Link>
            <button className="header__button" type="button" onClick={onExit}>Выход</button>
          </div>
        </Route>
      </section>
    </>
  )
}
export default Header;