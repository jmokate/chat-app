import React from "react";
import Message from "./Message";
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
import "../index.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: false,
      messages: [
        {
          id: null,
          userName: "You",
          text: ""
        }
      ]
    };
  }

  handleChange = event => {
    let display = event.target.value;
  };

  handleSubmit = async event => {
    event.preventDefault();

    let text = event.target.value;

    let id = new Date().getTime();
    await this.setState({
      displayMessage: true,
      messages: { id: id, userName: "You", text: text }
    });
    console.log(this.state.messages);
  };

  render() {
    let display = this.state.displayMessage;
    let renderMessage;
    const messages = { ...this.state.messages };

    if (display) {
      renderMessage = (
        <Message
          key={messages.id}
          userName={messages.userName}
          text={messages.text}
        />
      );
    }

    return (
      <div>
        <Container className='title'>
          <Row noGutters>
            <Col className='title-text' align='center'>
              Trash Talk!
            </Col>
          </Row>
        </Container>
        <Container className='main-outline'>
          <Row noGutters>
            <Col className='users-box' xs={3} md={3} align='center'>
              <span className='labels'>Users</span>
              {/* USERS IN CHAT */}
              <Table size='sm' borderless>
                <tbody>
                  <tr>
                    <td className='you'>You</td>
                  </tr>
                  <tr>
                    <td className='users-online'>Someone Else</td>
                  </tr>
                  <tr>
                    <td className='users-offline'>User offline</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col className='empty-col'></Col>
            <Col className='chat-box' xs={8} md={8} align='center'>
              <span className='labels'>Messages</span>
              {renderMessage}
            </Col>
          </Row>
          <Row noGutters>
            <Col xs={4} md={4}></Col>
            <Col xs={8} md={8}>
              <Form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <FormControl
                    as='textarea'
                    placeholder='you gonna let em talk to you like that?'
                    className='text-input'
                    value={this.state.messages.text}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                  />
                  <InputGroup.Append>
                    <Button className='btn' onClick={this.handleSubmit}>
                      get 'em!
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Chat;
