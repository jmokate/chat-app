import React from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  Form,
  FormControl,
  Table
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  state = {
    userName: "",
    password: ""
  };

  handleNameChange = e => {
    this.setState(
      {
        userName: e.target.value
      },
      () => console.log(this.state.userName)
    );
  };

  handlePassChange = e => {
    this.setState(
      {
        password: e.target.value
      },
      () => console.log(this.state.password)
    );
  };

  handleSubmit = e => {
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
    }

    newUser = {
      userName: userName,
      password: password
    };

    this.registerUser(newUser);
  };

  registerUser = async user => {};

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