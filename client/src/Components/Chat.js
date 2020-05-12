import React from "react";
import Message from "./Message";
import Users from "./Users";
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
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";
import socketIoClient from "socket-io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: false,
      text: "",
      messagesInDataBase: [],
      users: [],
      currentUser: {}
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const checkStorage = sessionStorage.getItem("user");
    if (!checkStorage) {
      history.push("/login");
    }
    const userStorage = JSON.parse(sessionStorage.getItem("user"));

    this.setState(
      {
        currentUser: userStorage
      },
      () => console.log(this.state.currentUser)
    );

    this.getAllUsers();
    this.getAllMessages();
  }

  componentDidUpdate() {
    const scrollDiv = document.querySelector(".messagesContainer");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  getAllUsers = async () => {
    const usersUrl = `/api/users`;
    await axios
      .get(usersUrl)
      .then(response => {
        const users = response.data;

        this.setState({
          users: users
        });
        console.log(users);
      })
      .catch(err => console.log(err));
  };

  getAllMessages = async () => {
    const messagesUrl = `/api/messages`;
    await axios
      .get(messagesUrl)
      .then(response => {
        const messages = response.data;
        this.setState({
          messagesInDataBase: messages
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = async event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(event.target);
    if (!this.state.text) {
      return null;
    }
    if (this.state.text.trim() == "") {
      return null;
    }

    let newMessage = {
      id: this.state.currentUser.id,
      username: this.state.currentUser.userName,
      text: this.state.text
    };

    this.submitMessageToDataBase(newMessage);

    this.setState(
      {
        displayMessage: true,
        messagesInDataBase: [...this.state.messagesInDataBase, newMessage]
      },
      () => console.log(this.state.currentMessages)
    );

    console.log(this.state.messagesInDataBase);

    this.setState({ text: "" });
  };

  submitMessageToDataBase = async newMessage => {
    const text = newMessage.text;
    console.log(text);
    const url = "/api/messages";

    await axios
      .post(url, newMessage)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  handleKeyPress = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (!this.state.text) {
        event.preventDefault();
      } else if (this.state.text) {
        this.handleSubmit();
        event.preventDefault();
      }
      if (event.shiftKey && event.key === 13) {
        event.preventDefault();
        this.setState(prevState => ({ text: prevState.text + "\n" }));
      }
    }
  };

  handleLogout = () => {
    const { history } = this.props;
    sessionStorage.removeItem("user");
    history.push("/login");
  };

  render() {
    const messages = this.state.messagesInDataBase;

    let currentId;
    if (this.state.currentUser) {
      currentId = this.state.currentUser.id;
    }

    let renderMessage = messages.map(message => {
      return message.id == currentId ? (
        <Message
          userName={message.username}
          text={message.text}
          className={"you"}
        />
      ) : (
        <Message
          userName={message.username}
          text={message.text}
          className={"users-online"}
        />
      );
    });
    const users = this.state.users;

    let renderUsers = users.map(user => {
      return user.id == currentId ? (
        <Users key={user.id} userName={user.username} className={"you"} />
      ) : (
        <Users
          key={user.id}
          userName={user.username}
          className={"users-online"}
        />
      );
    });

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
              <div className='usersContainer'>
                {/* USERS IN CHAT */}

                {renderUsers}
              </div>
            </Col>
            <Col className='empty-col'></Col>
            <Col className='chat-box' xs={8} md={8} align='center'>
              <span className='labels'>Messages</span>
              <div className='messagesContainer'>{renderMessage}</div>
            </Col>
          </Row>
          <Row noGutters>
            <Col xs={4} md={4}>
              <Button onClick={this.handleLogout}>
                <AiOutlineLogout />
              </Button>
              <p>Logout</p>
            </Col>
            <Col xs={8} md={8}>
              <Form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <FormControl
                    id='msgForm'
                    as='textarea'
                    placeholder='you gonna let em talk to you like that?'
                    className='text-input'
                    value={this.state.text}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
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
