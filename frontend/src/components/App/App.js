import './App.css';
import Main from "../Main/Main"
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const history = useHistory();



  return (
    <>
    <Main/>
    


    </>
  )
}
export default App;