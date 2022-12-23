import { connection } from "../database/db.js";
import * as visitRepository from "./visitRepository.js" 

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

async function consultUrlId(id){
    const shortUrl = await connection.query(`
    SELECT id, "shortUrl", url FROM shortens WHERE id = $1`, [id]);
    return shortUrl.rows[0];
}

async function getUrl(urlShort){
    const result = await connection.query(`
    SELECT * FROM shortens WHERE "shortUrl" = $1`, [urlShort]);
    
    if(result.rowCount > 0){
        const shortId = result.rows[0].id;
        
        visitRepository.updateInsertVisit(shortId);
    }

    return result;
}

export { tokenValidate, insertUrl, consultUrlId, getUrl };