require("dotenv").config();
const PASS = process.env.POSTGRES;
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    // console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(`something is not right ${err}`);
    return [];
  }
};

//get all users that are ONLINE
queryActiveUsers = async () => {
  try {
    console.log("connected to users in database");
    // const results = await client.query(
    //   "SELECT * FROM users WHERE last_active_at > NOW() - INTERVAL '30 minutes';"
    // );
    const results = await client.query(
      "SELECT * FROM users WHERE is_logged_in = true"
    );
    // console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(`something is not right ${err}`);
    return [];
  }
};

//create a user in db
createUser = async (username, password) => {
  try {
    const hash = await bcrypt.hashSync(password, saltRounds);
    await client.query("BEGIN");
    const results = await client.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
      [username, hash]
    );
    console.log(`new row inserted with value of ${username}`);
    await client.query("COMMIT");
    console.table(results.rows[0].id);
    return results.rows[0].id;

    // Store hash in your password DB.
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
      "SELECT m.user_id, m.id, m.text, m.created_date, u.username FROM messages AS m INNER JOIN users AS u ON u.id = m.user_id;"
    );
    // const results = await client.query(
    //   "SELECT * FROM messages JOIN users ON messages.user_id = users.id"
    // );
    // console.table(results.rows);
    console.table(results.rows[0]);
    return results.rows;
  } catch (err) {
    console.log(`something went wrong ${err}`);
    return [];
  }
};
// get a message by id in db

loginUser = async (name, password) => {
  try {
    console.log(name);
    console.log("getting a message by id in messages");
    await client.query("BEGIN");
    const results = await client.query(
      `SELECT * FROM users WHERE username = '${name}';`
    );
    saltedPassword = results.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, saltedPassword);
    // console.table(results.rows[0]);
    if (passwordMatch) {
      await client.query(
        `UPDATE users SET last_active_at = NOW() WHERE username = '${name}'`
      );
      await client.query(
        `UPDATE users SET is_logged_in = true WHERE username = '${name}'`
      );
      await client.query("COMMIT");
      return results.rows[0];
    }
    // return false;
  } catch (err) {
    console.log(`something is not right with the id ${name}`);
    return false;
  }
};

logOutUser = async name => {
  try {
    await client.query("BEGIN");
    const results = await client.query(
      `SELECT * FROM users WHERE username = '${name}'`
    );
    await client.query(
      `UPDATE users SET is_logged_in = false WHERE username = '${name}'`
    );
    await client.query("COMMIT");
    return results.rows[0];
  } catch (err) {
    console.log("there is a problem with logging out the user");
    return false;
  }
};

//create a message in the db
createMessage = async (userId, text, createdDate) => {
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO messages(user_id, text) VALUES($1, $2) RETURNING id, created_date",
      [userId, text]
    );
    // const createdDate = await client.query(
    // `SELECT created_date FROM messages WHERE user_id = ${userId} AND text = ${text}`
    // );
    await client.query(
      `UPDATE users SET last_active_at = NOW() WHERE id = '${userId}'`
    );
    // const result = await client.query("SELECT created_date FROM messages WHERE id = 105;")
    await client.query("COMMIT");
    // console.table(createdDate.rows[0]);
    // console.log(`new message by ${userId} that says ${text}`);
  } catch (err) {
    console.log(`there was an error with ${(userId, text)}`);
    await client.query("ROLLBACK");
  }
};

module.exports = {
  connectToDb,
  queryUsers,
  queryActiveUsers,
  queryAllMessages,
  loginUser,
  logOutUser,
  createMessage,
  createUser
};
