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

async function consultEmail(email){
    const emailExist = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return emailExist;
}

async function createToken(userId, token){
    const newToken = await connection.query(`
    INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]);
    return newToken;
}

export { insertUser, emailValidate, consultEmail, createToken };