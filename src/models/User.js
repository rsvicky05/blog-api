const {pool} = require('../config/db');

const createUser = async (first_name, last_name, email, password, role) => {
    const [result] = await pool.query(`INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)`, 
        [first_name, last_name, email, password, role]);

    console.log(result)
    return {id: result.insertId, email}
} 

const findByEmail = async (email) => {
    const [row] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
    return row[0]
}
module.exports = {createUser, findByEmail}