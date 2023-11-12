import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';



function App() {

  const[user, setLoginUser] = useState({

  })
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {
              user && user._id
              ?
              <Homepage setLoginUser={setLoginUser}/>
              :
              <Login setLoginUser={setLoginUser}/>
            }
            
            </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
            </Route>
          <Route path="/register"><Register/></Route>
        </Switch>
          </BrowserRouter>
     
    </div>
  );
}

export default App;
