import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Word from "../Word/Word";
import PopupCategory from "../PopupCategory/PopupCategory";
import Register from "../Register/Register";
import Login from "../Login/Login";
import * as MainApi from '../../utils/MainApi';
import MainPopup from "../MainPopup/MainPopup";
import Footer from '../Footer/Footer';


function App() {

  const [isPopupCategory, setIsPopupCategory] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [errorServer, setErrorServer] = useState('');
  const [isMainPopup, setIsMainPopup] = useState(false);
  const [isWord, setIsWord] = useState('')
  const [mainTitle, setMainTitle] = useState('')





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
      if (evt.target.classList.contains('popupCategory' && 'mainPopup')) {
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
    setIsMainPopup(false);
  }


  function handleAddWordCollections(valueCollection, addItem) {
    console.log(valueCollection, addItem)
    MainApi.postWordCollection(valueCollection, addItem)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  function deleteWordCollection(collectionId) {
    MainApi.deleteWordCollection(collectionId)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  function handlePatchCollection(wordId, nameCollection, patchCollection) {
    MainApi.patchCollection(wordId, nameCollection, patchCollection)
      .then((data) => {
        console.log(data)
        localStorage.setItem('collection', JSON.stringify(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function openMainPopup() {
    setIsMainPopup(true)
    setIsWord(JSON.parse(localStorage.getItem('collection')).word[Math.floor(Math.random() * JSON.parse(localStorage.getItem('collection')).word.length)])
    setMainTitle(JSON.parse(localStorage.getItem('collection')))
  }

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
          onDeleteCollection={deleteWordCollection}
          onSubmitPatchCollection={handlePatchCollection}
        />

        <MainPopup
          isMainPopup={isMainPopup}
          closeMainPopup={closePopup}
          isWord={isWord}
          mainTitle={mainTitle}
          setIsWord={setIsWord}
        />

      </CurrentUserContext.Provider>
      <Footer />
    </>

  )
}
export default App;


