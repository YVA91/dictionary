import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Word from "../Word/Word";
import Preload from "../Preload/Preload";

import Verbs from "../Verbs/Verbs";

import PopupCategory from "../PopupCategory/PopupCategory";
import Register from "../Register/Register";
import Login from "../Login/Login";
import * as MainApi from '../../utils/MainApi';
import MainPopup from "../MainPopup/MainPopup";
import Footer from '../Footer/Footer';

import { useDispatch } from 'react-redux';
import { popup } from '../../store/mainPopupDictionary'
import { closeMainPopup } from '../../store/mainPopupDictionary'

import { useSelector } from 'react-redux';


function App() {
  const isMainPopup = useSelector(state => state.WordReducer.isMainPopup);
  const dispatch = useDispatch();
  const [isPopupCategory, setIsPopupCategory] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [errorServer, setErrorServer] = useState('');
  const [isPreload, setIsPreload] = useState(false);


  useEffect(() => {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true)
        history.push('/word')
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

  useEffect(() => {
    function closeByEscapeAndOverlay(evt) {
      if (evt.key === 'Escape') {
        closePopup()
      }
      if (evt.target.classList.contains('popupCategory') || evt.target.classList.contains('mainPopup')) {
        closePopup()
      }
    }
    if (isPopupCategory || isMainPopup) {
      document.addEventListener('keydown', closeByEscapeAndOverlay);
      document.addEventListener("mousedown", closeByEscapeAndOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscapeAndOverlay);
        document.removeEventListener("mousedown", closeByEscapeAndOverlay);
      }
    }
  })

  function handleSubmitRegister(email, password, name) {
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
  }

  function handleSubmitAuthorize(email, password) {
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
  }

  function handleExit() {
    MainApi.getExit()
      .then(() => {
        history.push('/')
        setLoggedIn(false)
        setCurrentUser({})
        localStorage.removeItem('collection')
      })
      .catch(err => console.log(err))
  }

  function openPopupCategories() {
    setIsPopupCategory(true);
  }

  function closePopup() {
    setIsPopupCategory(false)
    dispatch(closeMainPopup())
  }

  function handleAddWordCollections(valueCollection, addItem) {
    setIsPreload(true);
    MainApi.postWordCollection(valueCollection, addItem)
      .then((data) => {
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      setIsPreload(false)
      })
  }

  function handlePatchCollection(wordId, nameCollection, patchCollection) {
    setIsPreload(true);
    MainApi.patchCollection(wordId, nameCollection, patchCollection)
      .then((data) => {
        console.log(data);
        localStorage.setItem('collection', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      setIsPreload(false)
      })
  }

  function openMainPopup() {
    dispatch(popup())
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser} >
        <Header
          onExit={handleExit}
        />
        <Preload
        isPreload={isPreload}/>
        <Switch>
          <Route exact path="/">
            
            <Main />
          </Route>
          <Route
            exact path="/word"
            children={
              <ProtectedRoute loggedIn={loggedIn}>
                <Word
                  openPopupCategories={openPopupCategories}
                  openMainPopup={openMainPopup}
                />
                
              </ProtectedRoute>
            }
          />

          <Route
            exact path="/verbs"
            children={
              <ProtectedRoute loggedIn={loggedIn}>
                <Verbs />
              </ProtectedRoute>
            }
          />

          <Route path="/signup">
            {!loggedIn ? (
              <Register
                textButton="Зарегистрироваться"
                title="Регистрация"
                errorServer={errorServer}
                onRegister={handleSubmitRegister}
              />) : (<Redirect to="/word" />)
            } </Route>

          <Route path="/signin">
            {!loggedIn ? (
              <Login
                textButton="Войти"
                title="Вход"
                errorServer={errorServer}
                onLogin={handleSubmitAuthorize}
              />
            ) : (<Redirect to="/word" />)
            } </Route>

        </Switch>
        <PopupCategory
          isPopupCategory={isPopupCategory}
          onSubmit={handleAddWordCollections}
          setIsPopupCategory={setIsPopupCategory}
          onSubmitPatchCollection={handlePatchCollection}
        />
        <MainPopup
          closeMainPopup={closePopup}
        />
      </CurrentUserContext.Provider>
      <Footer />
    </>

  )
}
export default App;


