import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Register from "./Components/Register";
import LoggedIn from "./Components/LoggedIn";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/loggedin' component={LoggedIn} />
        <Route path='/' component={Chat}></Route>
      </Switch>
    </div>
  );
}

export default App;
