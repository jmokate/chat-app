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
      const LoggedInUser = JSON.parse(sessionStorage.getItem("user"));
      alert("you are already logged in as " + LoggedInUser.userName);
      history.push("/");
    }
  }

  render() {
    return (
      <Container fluid id='login-container' className='justify-content-center'>
        <Row className='justify-content-center'>
          <h1 className='mt-4'>Sign In</h1>
        </Row>

        <Form className=''>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='email' placeholder='enter your username' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter your password' />
          </Form.Group>

          <Button md='auto' className='btn-login' size='lg' block>
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
