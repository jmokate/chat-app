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

function Login(props) {
  return (
    <Container>
      <Row>
        <h1>Sign In</h1>
      </Row>
      <Row>
        <Form>
          <Form.Label>Username</Form.Label>
          <Form.Control type='email' placeholder='enter your username' />
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
