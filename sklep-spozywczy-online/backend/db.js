require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sklep-db',
  waitForConnections: true,
  connectionLimit: 10,
};

async function getPool() {
    const pool = mysql.createPool(config);
    return pool;
}

async function migrate() {
    const sql = fs.readFileSync('./backend/migration.sql', 'utf8');
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(sql);
        console.log('Migration completed successfully.');
    } finally {
        conn.release();
        await pool.end();
    }
}

if (require.main === module) {
    const cmd = process.argv[2];
    if (cmd === 'migrate') {
        migrate().catch(err => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
  } 
}

module.exports = { getPool };