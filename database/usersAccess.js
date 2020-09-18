const bcrypt = require("bcrypt");
const saltRounds = 10;
const pgAccess = require("./pg-access");
require("dotenv").config();
require("../routes/users-routes");
const { Pool } = require("pg");
const pool = new Pool();

createUser = async (username, password) => {
	async () => {
		const client = await pool.connect();
		console.log("connected to create user");
		try {
			const hash = await bcrypt.hashSync(password, saltRounds);
			await client.query("BEGIN");
			await client.query(
				"INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
				[username, hash]
			);
			const results = await client.query(
				`SELECT * FROM users WHERE username = '${username}';`
			);

			await client.query("COMMIT");
			return results.rows[0];
		} catch (err) {
			console.log(`User not created ${err}`);
			await client.query("ROLLBACK");
			return false;
		}
	};
};

queryInactiveUsers = async () => {
	async () => {
		const client = await pool.connect();
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
};

queryActiveUsers = async () => {
	async () => {
		const client = await pool.connect();
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
};

module.exports = { createUser, queryInactiveUsers, queryActiveUsers };
