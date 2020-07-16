import React from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  state = {
    userName: "",
    password: ""
  };

  componentDidMount() {
    const { history } = this.props;
    const checkStorage = localStorage.getItem("user");
    if (checkStorage) {
      history.push("/loggedin");
    }
  }

  handleNameChange = e => {
    this.setState({
      userName: e.target.value
    });
  };

  handlePassChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = () => {
    const { userName, password } = this.state;

    if (
      !userName ||
      !password ||
      userName.trim() == "" ||
      password.trim() == ""
    ) {
      alert(
        "Username and Password fields must be filled out and cannot contain any spaces"
      );
    } else {
      const newUser = {
        userName: userName.toLowerCase(),
        password: password
      };
      this.registerUser(newUser);
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  registerUser = async user => {
    const { history } = this.props;
    const { userName } = this.state;

    await axios
      .post("/api/users", user)
      .then(response => {
        if (response.status == 201) {
          const newUser = {
            userName: userName,
            id: response.data.newUserId
          };

          localStorage.setItem("user", JSON.stringify(newUser));
          history.push("/");
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  render() {
    return (
      <Container fluid id='login-container' className='justify-content-center'>
        <Row className='justify-content-center'>
          <h1 className='mt-4'>Register</h1>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='newUserName'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={this.handleNameChange}
              type='email'
              placeholder='create a username'
            />
          </Form.Group>
          <Form.Group controlId='newUserPass'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handlePassChange}
              type='password'
              placeholder='create a password'
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>

          <Button
            onClick={this.handleSubmit}
            md='auto'
            className='btn-login'
            size='lg'
            block
          >
            Register
          </Button>

          <Link to='/login' className='link'>
            <Button className='btn-register' size='lg' block>
              I Have an Account
            </Button>
          </Link>
        </Form>
      </Container>
    );
  }
}

export default Register;
