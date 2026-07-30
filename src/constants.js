require('dotenv').config();

module.exports = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3030,
    DBPATH: process.env.DBPATH || 'src/db/project.db',
    SECRET: process.env.SECRET || 'dev-secret'
};