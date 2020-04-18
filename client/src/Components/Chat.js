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

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: false,
      text: "",
      messages: [],
      users: [],
      currentUser: {}
    };
  }

  async componentDidMount() {
    if (!sessionStorage.getItem("user")) {
      this.signInUser();
    }
    const userStorage = JSON.parse(sessionStorage.getItem("user"));

    //console.log(userStorage);

    this.setState(
      prevState => (
        {
          currentUser: { ...prevState.currentUser, userStorage }
        },
        () => console.log(this.state.currentUser)
      )
    );

    this.getAllUsers();
    this.getAllMessages();
  }

  signInUser = () => {
    const name = prompt("Enter A User Name");

    if (!name || name.trim() == "") {
      this.signInUser();
    }

    // sessionStorage.setItem("name", name);
    // this.setState({
    //   userName: name
    // });
    // const newUser = {
    //   id: null,
    //   userName: name
    // };
    // console.log(newUser);
    this.submitNewUserToDataBase(name);
  };

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
          messages: messages
        });
        console.log(messages);
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = async event => {
    if (!this.state.text) {
      //event.preventDefault();
      return null;
    }
    if (this.state.text.trim() == "") {
      return null;
    }
    let text = this.state.text;

    let userName = this.state.currentUser.userName;
    let newMessage = {
      userName: userName,
      text: text
    };

    this.submitMessageToDataBase(newMessage);

    await this.setState({
      displayMessage: true,
      messages: [...this.state.messages, newMessage]
    });

    console.log(this.state.messages);
    this.setState({ text: "" });
  };

  submitNewUserToDataBase = async newUserName => {
    const url = "/api/users";

    console.log(newUserName);
    const nameObject = { newUser: newUserName };

    await axios
      .post(url, nameObject)
      .then(response => {
        if (response.status == 201) {
          const newUser = {
            id: response.data.newUserId,
            userName: newUserName
          };

          console.log(newUser);

          sessionStorage.setItem("user", JSON.stringify(newUser));
          this.setState(
            {
              currentUser: { ...this.state.currentUser, newUser }
            },
            () => console.log(this.state.currentUser)
          );
        } else throw error;
      })
      .catch(error => console.log(error));
  };

  submitMessageToDataBase = async newMessage => {
    console.log(newMessage);
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

  render() {
    //let display = this.state.displayMessage;
    let renderMessage;
    const messages = this.state.messages;

    //if (display) {
    renderMessage = messages.map(messages => (
      <Message
        key={messages.id}
        userName={messages.username}
        text={messages.text}
      />
    ));

    //}
    let renderUsers;
    const users = this.state.users;
    renderUsers = users.map(user => (
      <Users key={user.id} userName={user.username} />
    ));

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
                <tbody>{renderUsers}</tbody>
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
