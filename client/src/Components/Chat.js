import React from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  FormControl
} from "react-bootstrap";
import "../index.css";

class Chat extends React.Component {
  constructor() {
    super();
    this.State = {};
  }

  render() {
    return (
      <Container fluid className='main-outline'>
        <Row noGutters>
          <Col className='users-box' xs={3} md={3} align='center'>
            <span className='labels'>Users</span>
          </Col>
          <Col className='empty-col'></Col>
          <Col className='chat-box' xs={8} md={8} align='center'>
            <span className='labels'>Messages</span>
          </Col>
        </Row>
        <Row noGutters>
          <Col xs={4} md={4}></Col>
          <Col xs={8} md={8}>
            <InputGroup className='text-input'>
              <FormControl as='textarea' placeholder='talk trash' />
              <InputGroup.Append>
                <Button>send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Chat;
