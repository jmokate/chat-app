const pgAccess = require("./pg-access");

queryAllMessages = async () => {
	let pool = await pgAccess.connectToDb();
	try {
		const results = await pool.query(
			"SELECT m.user_id, m.id, m.text, m.created_date, u.username FROM messages AS m INNER JOIN users AS u ON u.id = m.user_id;"
		);
		return results.rows;
	} catch (err) {
		console.log(`Messages not queried ${err}`);
		return [];
	}
};

createMessage = async (userId, text, createdDate) => {
	try {
		await pool.query("BEGIN");
		const result = await pool.query(
			"INSERT INTO messages(user_id, text) VALUES($1, $2) RETURNING id, created_date, user_id, text",
			[userId, text]
		);
		await pool.query(
			`UPDATE users SET last_active_at = NOW() WHERE id = '${userId}'`
		);
		await pool.query("COMMIT");
		return result.rows[0];
	} catch (err) {
		console.log(`could not create message ${err}`);
		await pool.query("ROLLBACK");
	}
};

module.exports = { createMessage, queryAllMessages };
