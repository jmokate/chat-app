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

connectToDb = async () => {
	// ASYNC CONNECT TO DB

	const pool = new Pool(
		process.env.NODE_ENV === "production" ? herokuAddonConfig : localConfig
	);
	if (pool) {
		return pool;
	} else {
		try {
			await pool.connect();
			console.log("connected to chat_app database");
			return pool;
		} catch (err) {
			console.log("Not connected to DB" + err);
		}
	}
};

module.exports = { connectToDb };
