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
    .catch(err => console.error("connection error", err.stack))
    .finally(() => client.end());
};

module.exports = { connectToDb };
