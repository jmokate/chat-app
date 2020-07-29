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
			text: "",
			messagesInDataBase: [],
			users: [],
			currentUser: {},
			usersOnline: [],
			usersOffline: [],
			endpoint: "http://localhost:5000",
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
			currentUser: userStorage,
		});
		this.getAllUsers();
		window.setInterval(this.getAllUsers, 600000);
		this.getAllMessages();

		// socket CONNECTION listener
		socket.on("new_message", msg => {
			console.log("connection to socket message: " + msg);
		});

		// socker USER LOGIN listener
		socket.on("user_online", userOnline => {
			const parsedUserOnline = JSON.parse(userOnline);

			this.setState({
				usersOnline: [...this.state.usersOnline, parsedUserOnline],
			});
		});

		socket.on("user_disconnect", userDisconnect => {
			const parsedUserDisconnectId = JSON.parse(userDisconnect);
			this.setState(prevState => ({
				usersOnline: prevState.usersOnline.filter(person => {
					return person.id !== parsedUserDisconnectId;
				}),
			}));
		});

		// socket MESSAGE listener
		socket.on("chat_message", chatMsg => {
			const parsedMsg = JSON.parse(chatMsg);

			this.setState({
				messagesInDataBase: [...this.state.messagesInDataBase, parsedMsg],
			});
		});
	}

	componentDidUpdate() {
		const scrollDiv = document.querySelector(".messagesContainer");
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	}

	getAllUsers = async () => {
		const usersUrl = `/api/users?active=true`;
		await axios
			.get(usersUrl)
			.then(response => {
				const users = response.data;

				this.setState({
					usersOnline: users,
				});
			})
			.catch(err => console.log(err));
		this.getOfflineUsers();
	};

	getOfflineUsers = async () => {
		const usersUrl = `/api/users`;
		await axios
			.get(usersUrl)
			.then(response => {
				const users = response.data;

				this.setState({
					usersOffline: users,
				});
			})
			.catch(err => console.log(err));
		this.checkUserActivity();
	};

	checkUserActivity = async () => {
		const { currentUser, usersOffline } = this.state;

		for (let i = 0; i < usersOffline.length; i++) {
			let users = usersOffline[i];
			if (users.id == currentUser.id) {
				this.handleLogout();
			}
		}
	};

	getAllMessages = async () => {
		const messagesUrl = `/api/messages`;
		await axios
			.get(messagesUrl)
			.then(response => {
				const messages = response.data;
				this.setState({
					messagesInDataBase: messages,
				});
			})
			.catch(err => console.log(err));
	};

	handleMessageInputChange = async event => {
		this.setState({ text: event.target.value });
	};

	handleMessageSubmit = async () => {
		if (!this.state.text || this.state.text.trim() == "") {
			return null;
		}

		let newMessage = {
			id: this.state.currentUser.id,
			username: this.state.currentUser.userName,
			text: this.state.text,
		};

		this.submitMessageToDataBase(newMessage);

		this.setState({ text: "" });
	};

	submitMessageToDataBase = async newMessage => {
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
				this.handleMessageSubmit();
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
		const { currentUser } = this.state;
		const url = "/api/logout";

		await axios
			.post(url, currentUser)
			.then(response => console.log(response))
			.catch(err => console.log(err));

		this.setState(prevState => ({
			usersOnline: prevState.usersOnline.filter(person => {
				return person.id !== currentUser.id;
			}),
		}));

		localStorage.removeItem("user");
		history.push("/login");
	};

	render() {
		const { messagesInDataBase } = this.state;
		let currentId;

		if (this.state.currentUser) {
			currentId = this.state.currentUser.id;
		}

		const renderMessage = messagesInDataBase.map(message => {
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

		const { usersOnline } = this.state;

		const renderUsers = usersOnline.map(user => {
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
							<Form onSubmit={this.handleMessageSubmit}>
								<InputGroup>
									<FormControl
										id='msgForm'
										as='textarea'
										placeholder='you gonna let em talk to you like that?'
										className='text-input'
										value={this.state.text}
										onChange={this.handleMessageInputChange}
										onKeyPress={this.handleKeyPress}
									/>
									<InputGroup.Append>
										<Button className='btn' onClick={this.handleMessageSubmit}>
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
