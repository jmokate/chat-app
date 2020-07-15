const moment = require("moment");
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
    console.log("Not connected to DB" + err);
  }
};

queryInactiveUsers = async () => {
  try {
    const results = await client.query(
      "SELECT * FROM users WHERE is_logged_in = false;"
    );
    return results.rows;
  } catch (err) {
    console.log(`Users not queried ${err}`);
    return [];
  }
};

queryActiveUsers = async () => {
  try {
    await client.query("SELECT * FROM users WHERE is_logged_in = true;");
    await client.query(
      "UPDATE users SET is_logged_in = false WHERE last_active_at < NOW() - INTERVAL '20 minutes';"
    );
    const results = await client.query(
      "SELECT * FROM users WHERE last_active_at > NOW() - INTERVAL '20 minutes' AND is_logged_in = true;"
    );
    return results.rows;
  } catch (err) {
    console.log(`Active users not queried ${err}`);
    return [];
  }
};

createUser = async (username, password) => {
  try {
    const hash = await bcrypt.hashSync(password, saltRounds);
    await client.query("BEGIN");
    const results = await client.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
      [username, hash]
    );

    await client.query("COMMIT");
    return results.rows[0].id;
  } catch (err) {
    console.log(`User not created ${err}`);
    await client.query("ROLLBACK");
    return false;
  }
};

queryAllMessages = async () => {
  try {
    const results = await client.query(
      "SELECT m.user_id, m.id, m.text, m.created_date, u.username FROM messages AS m INNER JOIN users AS u ON u.id = m.user_id;"
    );
    return results.rows;
  } catch (err) {
    console.log(`Messages not queried ${err}`);
    return [];
  }
};

loginUser = async (name, password) => {
  try {
    await client.query("BEGIN");
    const results = await client.query(
      `SELECT * FROM users WHERE username = '${name}';`
    );
    const saltedPassword = results.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, saltedPassword);

    if (results.rows[0].is_logged_in == true) {
      return {
        isSuccessful: false,
        errorMessage: "This user is already logged in"
      };
    }

    if (!passwordMatch) {
      return {
        isSuccessful: false,
        errorMessage: "Incorrect password"
      };
    } else {
      await client.query(
        `UPDATE users SET last_active_at = NOW() WHERE username = '${name}'`
      );
      await client.query(
        `UPDATE users SET is_logged_in = true WHERE username = '${name}'`
      );
      await client.query("COMMIT");
    }
    let successfulLogin = {
      isSuccessful: true,
      errorMessage: null,
      user: results.rows[0]
    };
    return successfulLogin;
  } catch (err) {
    console.log(`User not logged in ${err}`);
    return {
      isSuccessful: false,
      errorMessage: "Could not locate this username. Please register."
    };
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
    console.log(`Could not logout user ${err}`);
    return false;
  }
};

putLogoutUser = async id => {
  try {
    await client.query("BEGIN");
    await client.query(`SELECT * FROM users WHERE id = '${id}'`);
    await client.query(
      `UPDATE users SET is_logged_in = false WHERE id = '${id}'`
    );
    await client.query("COMMIT");
  } catch (err) {
    console.log(`Could not logout user ${err}`);
    return false;
  }
};

//create a message in the db
createMessage = async (userId, text, createdDate) => {
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO messages(user_id, text) VALUES($1, $2) RETURNING id, created_date, user_id, text",
      [userId, text]
    );
    await client.query(
      `UPDATE users SET last_active_at = NOW() WHERE id = '${userId}'`
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    console.log(`could not create message ${err}`);
    await client.query("ROLLBACK");
  }
};

module.exports = {
  connectToDb,
  queryInactiveUsers,
  queryActiveUsers,
  queryAllMessages,
  loginUser,
  logOutUser,
  putLogoutUser,
  createMessage,
  createUser
};
