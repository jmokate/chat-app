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
  }
};

//get all users from db
queryUsers = async () => {
  try {
    console.log("connected to users in database");
    const results = await client.query("SELECT * FROM users");
    console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(`something is not right ${err}`);
    return [];
  }
};

//create a user in db
createUser = async username => {
  try {
    await client.query("BEGIN");
    const results = await client.query(
      "INSERT INTO users(username) VALUES($1) RETURNING id",
      [username]
    );
    console.log(`new row inserted with value of ${username}`);
    await client.query("COMMIT");
    return results.rows[0].id;
  } catch (err) {
    console.log(`there was a problem posting a user ${err}`);
    await client.query("ROLLBACK");
    return false;
  }
};

// get all messages from db
queryAllMessages = async () => {
  try {
    console.log("connected to messages in database");
    const results = await client.query(
      "SELECT * FROM messages JOIN users ON messages.user_id = users.id"
    );
    console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(`something went wrong ${err}`);
    return [];
  }
};
// get a message by id in db

queryUserById = async name => {
  try {
    console.log(name);
    console.log("getting a message by id in messages");
    const results = await client.query(
      `SELECT * FROM users WHERE username = '${name}'`
    );
    console.table(results.rows[0]);
    return results.rows[0];
  } catch (err) {
    console.log(`something is not right with the id ${name}`);
    return [];
  }
};

//create a message in the db
createMessage = async (userId, text) => {
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
  }
};

module.exports = {
  connectToDb,
  queryUsers,
  queryAllMessages,
  queryUserById,
  createMessage,
  createUser
};
