const db = require("../config/db");

exports.add = async (roleName, description) => {
    await db.asyncRun(`
    INSERT INTO roles (role_name, description)
    VALUES (?, ?)
`, [roleName, description]);
}

exports.getAll = async () => {
    return await db.asyncAll(`
        SELECT * FROM roles
    `);
}

exports.getById = async (id) => {
    return await db.asyncGet(`
        SELECT * FROM roles
        WHERE id = ?
    `, [id]);
}

exports.delete = async (id) => {
    const result = await db.asyncRun(`
        DELETE FROM roles
        WHERE id = ?
    `, [id]);

    if (result.changes <= 0) {
        throw new Error('Role does not exist')
    }
}

exports.edit = async (id, roleName, description) => {
    await db.asyncRun(`
        UPDATE roles
        SET role_name = ?, description = ?
        WHERE id = ?
    `, [roleName, description, id]);
}