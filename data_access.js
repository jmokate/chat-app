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
    const results = await client.query(
      "SELECT * FROM users WHERE last_active_at > NOW() - INTERVAL '20 minutes' AND is_logged_in = true;"
    );
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
      "SELECT m.user_id, m.id, m.text, m.created_date, u.username FROM messages AS m INNER JOIN users AS u ON u.id = m.user_id;"
    );
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
    console.log("logging in results ", results.rows[0].is_logged_in);

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

// putLogoutUser = async id => {
//   try {
//     await client.query("BEGIN");
//     const results = await client.query(
//       `SELECT * FROM users WHERE id = '${id}'`
//     );
//     await client.query(
//       `UPDATE users SET is_logged_in = false WHERE id = '${id}'`
//     );
//     await client.query("COMMIT");
//     console.table(results.rows[0]);
//     // return results.rows[0];
//   } catch (err) {
//     console.log("there is a problem with logging out the user");
//     return false;
//   }
// };

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
