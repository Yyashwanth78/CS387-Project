const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "yash",
    host: "localhost",
    port: 5432,
    database: "proj"
});

module.exports = pool;