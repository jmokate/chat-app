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
import { NavLink } from "react-router-dom";

function Register(props) {
  return (
    <Container fluid id='login-container' className='justify-content-center'>
      <Row className='justify-content-center'>
        <h1 className='mt-4'>Register</h1>
      </Row>

      <Form className=''>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type='email' placeholder='create a username' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='create a password' />
        </Form.Group>

        <Button md='auto' className='btn-login' size='lg' block>
          Register
        </Button>
        <NavLink to='/login' className='link'>
          <Button className='btn-register' size='lg' block>
            I Have an Account
          </Button>
        </NavLink>
      </Form>
    </Container>
  );
}

export default Register;
