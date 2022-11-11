import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Word from "../Word/Word";

function App() {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const history = useHistory();



  return (
    <>
    <Header/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/word">
          <Word/>
        </Route>


      </Switch>
    </>
  )
}
export default App;