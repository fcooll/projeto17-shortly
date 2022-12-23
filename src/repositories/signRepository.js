import { connection } from "../database/db.js";

async function insertUser(name, email, password){
    const result = await connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);

    return result;
}

async function emailValidate(email){
    const checkEmail = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return checkEmail.rowCount;
}

export { insertUser, emailValidate };