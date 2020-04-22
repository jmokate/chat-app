import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Chat from "./Components/Chat";
import Login from "./Components/Login";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
