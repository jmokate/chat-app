// const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const pgAccess = require("./pg-access");
require("dotenv").config();
require("../routes/auth-routes");
require("pg");
const { Pool } = require("pg");
const pool = new Pool();

// const client = pgAccess.connectToDb();

loginUser = async (name, password) => {
	const client = await pgAccess.connectToDb();
	console.log("connected");
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
				errorMessage: "This user is already logged in",
			};
		} else if (results.rows[0].is_logged_in == false) {
			return {
				isSuccessful: true,
			};
		}

		if (!passwordMatch) {
			return {
				isSuccessful: false,
				errorMessage: "Incorrect password",
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
			user: results.rows[0],
		};
		return successfulLogin;
	} catch (err) {
		console.log(`User not logged in ${err}`);
		return {
			isSuccessful: false,
			errorMessage: "Could not locate this username. Please register.",
		};
	}
};

logOutUser = async name => {
	try {
		await pool.query("BEGIN");
		const results = await pool.query(
			`SELECT * FROM users WHERE username = '${name}'`
		);
		await pool.query(
			`UPDATE users SET is_logged_in = false WHERE username = '${name}'`
		);
		await pool.query("COMMIT");
		return results.rows[0];
	} catch (err) {
		console.log(`Could not logout user ${err}`);
		return false;
	}
};

putLogoutUser = async id => {
	try {
		await pool.query("BEGIN");
		await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
		await pool.query(
			`UPDATE users SET is_logged_in = false WHERE id = '${id}'`
		);
		await pool.query("COMMIT");
	} catch (err) {
		console.log(`Could not logout user ${err}`);
		return false;
	}
};

module.exports = { loginUser, logOutUser, putLogoutUser };
