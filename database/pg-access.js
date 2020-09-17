require("dotenv").config();
const { Pool } = require("pg");

const localConfig = {
	database: process.env.PG_DATABASE,
	user: process.env.PG_USER,
	port: process.env.PG_PORT,
	password: process.env.PG_PASSWORD,
};

const herokuAddonConfig = {
	connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
	process.env.NODE_ENV === "production" ? herokuAddonConfig : localConfig
);

connectToDb = async () => {
	// ASYNC CONNECT TO DB

	try {
		await pool.connect();
		console.log("connected to chat_app database");
	} catch (err) {
		console.log("Not connected to DB" + err);
	}
};

module.exports = { connectToDb };
