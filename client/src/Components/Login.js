import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    isLoggedIn: false
  };

  componentDidMount() {
    const { history } = this.props;
    const checkStorage = sessionStorage.getItem("user");
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
    } else {
      const newUser = {
        userName: userName,
        password: password
      };
      this.loginUser(newUser);
    }
  };

  loginUser = async user => {
    const { history } = this.props;
    const { userName } = this.state;
    //console.log(user.userName);

    await axios
      .post(`/api/login`, user)
      .then(response => {
        console.log(response);
        if (response.status == 201) {
          console.log("successful login!");
          console.log(response.data);

          const userLogin = {
            userName: response.data.userMatch.username,
            id: response.data.userMatch.id
          };
          console.log(userLogin);
          sessionStorage.setItem("user", JSON.stringify(userLogin));
          history.push("/");
        }
      })
      .catch(error => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  render() {
    return (
      <Container fluid id='login-container' className='justify-content-center'>
        <Row className='justify-content-center'>
          <h1 className='mt-4'>Sign In</h1>
        </Row>

        <Form onSubmit={this.handleSubmit} className=''>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={this.handleNameChange}
              type='email'
              placeholder='enter your username'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handlePassChange}
              type='password'
              placeholder='enter your password'
            />
          </Form.Group>

          <Button
            onClick={this.handleSubmit}
            md='auto'
            className='btn-login'
            size='lg'
            block
          >
            Sign In
          </Button>
          <Link to='/register' className='link'>
            <Button className='btn-register' size='lg' block>
              Register New Account
            </Button>
          </Link>
        </Form>
      </Container>
    );
  }
}

export default Login;
