const db = require('../config/db');

exports.create = async (name, description) => {
    const result = await db.asyncRun(`
        INSERT INTO teams (name, description)
        VALUES (?, ?)
    `, [name, description]);

    return exports.getById(result.lastID);
};

exports.getAll = async () => {
    return db.asyncAll(`
        SELECT teams.id, teams.name, teams.description,
               COUNT(team_members.user_id) AS member_count
        FROM teams
        LEFT JOIN team_members ON teams.id = team_members.team_id
        GROUP BY teams.id
        ORDER BY teams.name
    `);
};

exports.getById = async (teamId) => {
    const team = await db.asyncGet(`
        SELECT id, name, description
        FROM teams
        WHERE id = ?
    `, [teamId]);

    if (!team) {
        throw new Error('Team does not exist');
    }

    team.members = await getMembers(teamId);
    return team;
};

exports.update = async (teamId, name, description) => {
    const result = await db.asyncRun(`
        UPDATE teams
        SET name = ?, description = ?
        WHERE id = ?
    `, [name, description, teamId]);

    if (result.changes <= 0) {
        throw new Error('Team does not exist');
    }

    return exports.getById(teamId);
};

exports.delete = async (teamId) => {
    const result = await db.asyncRun('DELETE FROM teams WHERE id = ?', [teamId]);

    if (result.changes <= 0) {
        throw new Error('Team does not exist');
    }
};

exports.join = async (teamId, userId) => {
    await ensureTeamExists(teamId);

    try {
        await db.asyncRun(`
            INSERT INTO team_members (team_id, user_id)
            VALUES (?, ?)
        `, [teamId, userId]);
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            throw new Error('User is already a member of this team');
        }
        throw err;
    }

    return getMembers(teamId);
};

exports.leave = async (teamId, userId) => {
    const result = await db.asyncRun(`
        DELETE FROM team_members
        WHERE team_id = ? AND user_id = ?
    `, [teamId, userId]);

    if (result.changes <= 0) {
        throw new Error('User is not a member of this team');
    }
};

async function ensureTeamExists(teamId) {
    const team = await db.asyncGet('SELECT id FROM teams WHERE id = ?', [teamId]);
    if (!team) {
        throw new Error('Team does not exist');
    }
}

function getMembers(teamId) {
    return db.asyncAll(`
        SELECT users.id, users.username, users.email
        FROM users
        INNER JOIN team_members ON users.id = team_members.user_id
        WHERE team_members.team_id = ?
        ORDER BY users.username
    `, [teamId]);
}
