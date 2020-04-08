require("dotenv").config();

const PASS = process.env.POSTGRES;
//connecting to database
const { Client } = require("pg");
const client = new Client({
  database: "chat_app",
  user: "postgres",
  port: 5432,
  password: PASS
});

connectToDb = async () => {
  return await client
    .connect()
    .then(() => console.log("connected to chat_app database"))
    .then(() =>
      client.query("INSERT INTO users VALUES($1, $2, $3)", [
        null,
        "dusty",
        null
      ])
    )
    .then(() => client.query("SELECT * FROM users WHERE id > $1", [3]))
    .then(results => console.table(results.rows))
    .catch(err => console.error("connection error", err.stack))
    .finally(() => client.end());
};

//get all users from db
queryUsers = async () => {};

//create a user in db
createUser = async () => {};

// get all messages from db
queryAllMessages = async () => {};

// get a message by id in db
queryMessageById = async () => {};

//create a message in the db
createMessage = async () => {};

module.exports = { connectToDb };
