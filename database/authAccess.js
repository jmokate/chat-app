const bcrypt = require("bcrypt");
const pgAccess = require("./pg-access");
const { Client } = require("pg");
//const saltRounds = 10;

// createUser = async (username, password) => {
// 	try {
// 		const hash = await bcrypt.hashSync(password, saltRounds);
// 		await client.query("BEGIN");
// 		await client.query(
// 			"INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
// 			[username, hash]
// 		);
// 		const results = await client.query(
// 			`SELECT * FROM users WHERE username = '${username}';`
// 		);

// 		await client.query("COMMIT");
// 		return results.rows[0];
// 	} catch (err) {
// 		console.log(`User not created ${err}`);
// 		await client.query("ROLLBACK");
// 		return false;
// 	}
// };

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
				errorMessage: "This user is already logged in",
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

module.exports = { loginUser, logOutUser, putLogoutUser };
