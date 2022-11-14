import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Word from "../Word/Word";
import PopupCategory from "../PopupCategory/PopupCategory";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {

  const [isPopupCategory, setIsPopupCategory] = useState(false);
  const history = useHistory();

  function openPopupCategories() {
    setIsPopupCategory(true);
  }

  function closePopup() {
    setIsPopupCategory(false);
  }

  useEffect(() => {
    function closeByEscapeAndOverlay(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
      if (evt.target.classList.contains('popupCategory')) {
        closePopup()
      }
    }
    if (isPopupCategory) {
      document.addEventListener('keydown', closeByEscapeAndOverlay);
      document.addEventListener("mousedown", closeByEscapeAndOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscapeAndOverlay);
        document.removeEventListener("mousedown", closeByEscapeAndOverlay);
      }
    }
  })

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/word">
          <Word
            openPopupCategories={openPopupCategories} />
        </Route>

        <Route path="/signup">
          <Register 
          textButton="Зарегистрироваться"
          title="Регистрация"/>
        </Route>

        <Route path="/signin">
          <Login 
          textButton="Войти"
          title="Вход"/>
        </Route>

      </Switch>
      <PopupCategory
        isPopupCategory={isPopupCategory}
        closePopup={closePopup} />
    </>

  )
}
export default App;