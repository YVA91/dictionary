import './Header.css';
import { Route } from 'react-router-dom';

function Header() {
  

  return (
    <>
    <section className="header">
    <Route exact path={"/word"}>
      <button className="header__button" type="button">Профиль</button>
      <button className="header__button" type="button">Выход</button>
    </Route>
   
    </section>
    </>
  )
}
export default Header;