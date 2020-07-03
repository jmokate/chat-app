import React, { useState, useEffect } from "react";
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
import io from "socket.io-client";

let socket;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: false,
      text: "",
      messagesInDataBase: [],
      users: [],
      currentUser: {},
      usersOnline: [],
      endpoint: "http://localhost:5000"
    };
    socket = io(this.state.endpoint);
  }

  componentDidMount() {
    const { history } = this.props;
    const checkStorage = localStorage.getItem("user");
    if (!checkStorage) {
      history.push("/login");
    }
    const userStorage = JSON.parse(localStorage.getItem("user"));

    this.setState({
      currentUser: userStorage
    });
    this.getAllUsers();
    window.setInterval(this.getAllUsers, 600000);
    this.getAllMessages();

    // socket CONNECTION listener
    socket.on("new_message", msg => {
      console.log("connection to socket message: " + msg);
    });
    console.log("component mounting");

    // socker USER LOGIN listener
    socket.on("user_online", userOnline => {
      console.log("a new user has logged on through sockets");
      const parsedUserOnline = JSON.parse(userOnline);

      this.setState(
        {
          usersOnline: [...this.state.usersOnline, parsedUserOnline]
        },
        () => console.log(this.state.usersOnline)
      );
    });

    // socket.on("browser_disconnect", id => {
    //   console.log("brower disconnect");
    //   // this.setState(prevState => ({
    //   //   usersOnline: prevState.usersOnline.filter(
    //   //     person => {
    //   //       return person.id !== id;
    //   //     },
    //   //     () => console.log(this.state.usersOnline)
    //   //   )
    //   // }));
    // });

    socket.on("user_disconnect", userDisconnect => {
      console.log("a user has left the chat");
      const parsedUserDisconnectId = JSON.parse(userDisconnect);
      console.log(parsedUserDisconnectId);

      this.setState(prevState => ({
        usersOnline: prevState.usersOnline.filter(
          person => {
            return person.id !== parsedUserDisconnectId;
          },
          () => console.log(this.state.usersOnline)
        )
      }));
    });

    console.log("chat rendering");

    socket.on("disconnect", message => {
      console.log(message);
    });

    // socket MESSAGE listener
    socket.on("chat_message", chatMsg => {
      const parsedMsg = JSON.parse(chatMsg);
      console.log("the parsed user message is ", parsedMsg);

      this.setState({
        messagesInDataBase: [...this.state.messagesInDataBase, parsedMsg]
      });
    });
  }

  componentDidUpdate() {
    const scrollDiv = document.querySelector(".messagesContainer");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  getAllUsers = async () => {
    console.log("getting all users");
    const usersUrl = `/api/users?active=true`;
    await axios
      .get(usersUrl)
      .then(response => {
        const users = response.data;

        this.setState({
          usersOnline: users
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
        console.log(messages);
      })
      .catch(err => console.log(err));
  };

  handleChange = async event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = async () => {
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

    this.setState({
      displayMessage: true
    });

    this.setState({ text: "" });
  };

  submitMessageToDataBase = async newMessage => {
    const text = newMessage.text;

    // console.log(text);
    const url = "/api/messages";

    await axios
      .post(url, newMessage)
      .then(response => console.log(response.data))
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

  handleLogout = async () => {
    const { history } = this.props;

    const url = "/api/logout";
    const { currentUser } = this.state;

    console.log(currentUser);
    await axios
      .post(url, currentUser)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    this.setState(prevState => ({
      usersOnline: prevState.usersOnline.filter(
        person => {
          return person.id !== currentUser.id;
        },
        () => console.log(this.state.usersOnline)
      )
    }));

    localStorage.removeItem("user");
    history.push("/login");
  };

  render() {
    const messages = this.state.messagesInDataBase;

    let currentId;
    if (this.state.currentUser) {
      currentId = this.state.currentUser.id;
    }

    let renderMessage = messages.map(message => {
      return message.user_id == currentId ? (
        <Message
          key={message.id}
          userName={message.username}
          text={message.text}
          createdDate={message.created_date}
          className={"you"}
        />
      ) : (
        <Message
          key={message.id}
          userName={message.username}
          text={message.text}
          createdDate={message.created_date}
          className={"users-online"}
        />
      );
    });
    const users = this.state.usersOnline;

    let renderUsers = users.map(user => {
      return user.id == currentId ? null : (
        <Users
          key={user.id}
          userName={user.username}
          className={"users-online"}
        />
      );
    });
    const { currentUser } = this.state;
    renderUsers.push(
      <Users
        key={currentId}
        userName={currentUser.userName}
        className={"you"}
      />
    );

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
