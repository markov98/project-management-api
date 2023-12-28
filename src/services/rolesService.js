const db = require("../config/db");

exports.add = async (roleName, description) => {
    await db.asyncRun(`
    INSERT INTO roles (role_name, description)
    VALUES (?, ?)
`, [roleName, description]);
}