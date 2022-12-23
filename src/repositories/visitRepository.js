import { connection } from "../database/db.js";

async function updateInsertVisit(shortId){
    const result = await getVisit(shortId);
    
    if(result.rowCount > 0){
        return updateVisit(shortId);
    }

    return insertVisit(shortId);
}

async function getVisit(shortId){
    return connection.query(`
    SELECT * FROM visits WHERE "shortId" = $1`, [shortId]);
}

async function insertVisit(shortId){
    return connection.query(`
    INSERT INTO visits ("shortId", visit) VALUES ($1, $2);`, [shortId, 1]);
}

async function updateVisit(shortId){
    return connection.query(`
    UPDATE visits SET visist = visit + 1 WHERE "shortId" = $1`, [shortId]);
}

export { getVisit, insertVisit, updateVisit, updateInsertVisit }