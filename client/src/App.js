import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Register from "./Components/Register";
import LoggedIn from "./Components/LoggedIn";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", function(e) {
      const userStorage = JSON.parse(sessionStorage.getItem("user"));
      const id = userStorage.id;
      console.log("app.js user storage id is ", id);
      let confirmationMessage = "tab close";
      (e || window.event).returnValue = confirmationMessage;
      alert(confirmationMessage);
      axios.put(`/api/logout/${id}`, {
        is_logged_in: false
      });
    });
  }
  render() {
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
}

export default App;
