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
import * as MainApi from '../../utils/MainApi';


function App() {

  const [isPopupCategory, setIsPopupCategory] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [errorServer, setErrorServer] = useState('');


  useEffect(() => {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    history.listen(() => {
      setErrorServer('')
    })
  }, [history]);


  function handleSubmitRegister(email, password, name) {
    /* setInputdisabled(false)*/
    MainApi.register(email, password, name)
      .then((data) => {
        history.push('/word')
        setErrorServer('');
        setCurrentUser(data)
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(err)
        if (err === 409) {
          setErrorServer('Пользователь с таким e-mail уже зарегистрирован')
        } else {
          setErrorServer('Что-то пошло не так')
        }
      })
    /* .finally(() => {
        setInputdisabled(true)
      });*/
  }

  function handleSubmitAuthorize(email, password) {
    /*setInputdisabled(false)*/
    MainApi.authorize(email, password)
      .then((data) => {
        setCurrentUser(data)
        setErrorServer('');
        history.push('/word')
        setLoggedIn(true)
      })
      .catch((err) => {
        if (err === 401) {
          setErrorServer('Неправильные почта или пароль')
        } else {
          setErrorServer('Что-то пошло не так')
        }
      })
    /* .finally(() => {
      setInputdisabled(true)
    });*/
  }


  function handleExit() {
    MainApi.getExit()
      .then(() => {
        history.push('/')
        setLoggedIn(false)
        setCurrentUser({})
      })
      .catch(err => console.log(err))
  }




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
      <CurrentUserContext.Provider value={currentUser} >
        <Header
          onExit={handleExit}
        />
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
              title="Регистрация"
              errorServer={errorServer}
              onRegister={handleSubmitRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
              textButton="Войти"
              title="Вход"
              errorServer={errorServer}
              onLogin={handleSubmitAuthorize}
            />
          </Route>

        </Switch>
        <PopupCategory
          isPopupCategory={isPopupCategory}
          closePopup={closePopup} />
      </CurrentUserContext.Provider>
    </>

  )
}
export default App;