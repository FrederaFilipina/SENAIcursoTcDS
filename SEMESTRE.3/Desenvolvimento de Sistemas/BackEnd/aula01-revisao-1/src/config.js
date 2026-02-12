import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'M3uBD',
    database: 'bbtc_bd'
})

export {pool};