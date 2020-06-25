import React from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class LoggedIn extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    const { history } = this.props;
    console.log("mount");
    const checkStorage = localStorage.getItem("user");
    if (checkStorage) {
      this.setState({ isLoggedIn: true });
    } else if (!checkStorage) {
      history.push("/login");
      console.log("pushed");
    }
  }

  handleBackToChat = () => {
    const { history } = this.props;
    history.push("/");
  };

  handleLogOut = () => {
    const { history } = this.props;

    // const currentUser = JSON.parse(localStorage.getItem("user"));
    // const id = currentUser.id;

    // axios
    //   .put(`/api/logout/${id}`)
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err));
    localStorage.removeItem("user");
    history.push("/login");
  };

  render() {
    const LoggedInUser = JSON.parse(localStorage.getItem("user"));

    return (
      <Container fluid id='login-container' className='justify-content-center'>
        <Row className='justify-content-center'>
          <h3 className='mt-4'>You are signed in as:</h3>
          <h1>{LoggedInUser ? LoggedInUser.userName : null}</h1>
        </Row>

        <Button
          onClick={this.handleBackToChat}
          md='auto'
          className='btn-login'
          size='lg'
          block
        >
          Go Back To Chat
        </Button>

        <Button
          onClick={this.handleLogOut}
          className='btn-register'
          size='lg'
          block
        >
          Sign Out
        </Button>
      </Container>
    );
  }
}

export default LoggedIn;
