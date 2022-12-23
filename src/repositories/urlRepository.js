import { connection } from "../database/db.js";

async function tokenValidate(token){
    const validToken = await connection.query(`
    SELECT * FROM sessions WHERE token = $1`, [token]);
    return validToken;
}

async function insertUrl(url, shortUrl, userId){
    const newUrl = await connection.query(`
    INSERT INTO shortens (url, "shortUrl", "userId")
    VALUES ($1, $2, $3)`, [url, shortUrl, userId]);
    return newUrl;
}

export { tokenValidate, insertUrl };