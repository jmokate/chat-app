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
  // ASYNC CONNECT TO DB
  try {
    await client.connect();
    console.log("connected to chat_app database");
  } catch (err) {
    console.log("something wrong happened" + err);
  } finally {
    //   await client.end();
    queryUsers();
    console.log("client has moved on to queryUsers");
  }
};

//get all users from db
const queryUsers = async () => {
  try {
    //await client.connect();
    console.log("connected to users in database");
    const results = await client.query("SELECT * FROM users");
    console.table(results.rows);
  } catch (err) {
    console.log(`something is not right ${err}`);
  } finally {
    createUser("crap nation");
  }
};

//create a user in db
const createUser = async username => {
  try {
    await client.query("BEGIN");
    await client.query("INSERT INTO users(username) VALUES($1) RETURNING id", [
      username
    ]);
    console.log(`new row inserted with value of ${username}`);
    await client.query("COMMIT");
  } catch (err) {
    console.log(`there was a problem posting a user ${err}`);
    await client.query("ROLLBACK");
  } finally {
    queryAllMessages();
    console.log("moved onto querying messages table");
  }
};

// get all messages from db
const queryAllMessages = async () => {
  try {
    console.log("connected to messages in database");
    const results = await client.query("SELECT * FROM messages");
    console.table(results.rows);
  } catch (err) {
    console.log(`something went wrong ${err}`);
  } finally {
    queryMessageById(2);
    console.log("moved to get user by id");
  }
};

// get a message by id in db
const queryMessageById = async id => {
  try {
    console.log("getting a message by id in messages");
    const results = await client.query(
      `SELECT * FROM messages WHERE id = ${id}`
    );
    console.table(results.rows);
  } catch (err) {
    console.log(`something is not right with the id ${id}`);
  } finally {
    createMessage("5", "dang its nasty in here!");
  }
};

//create a message in the db
const createMessage = async (userId, text) => {
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO messages(user_id, text) VALUES($1, $2) RETURNING id",
      [userId, text]
    );
    await client.query("COMMIT");
    console.log(`new message by ${userId} that says ${text}`);
  } catch (err) {
    console.log(`there was an error with ${(userId, text)}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end;
    console.log("disconnected from db");
  }
};

module.exports = { connectToDb };
