import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.db,
    password: config.db.pw
});

export const db = pool.promise();   //프로미스도 비동기로 넘김
