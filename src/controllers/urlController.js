import { nanoid } from "nanoid";
import * as urlValidation from "../repositories/urlRepository.js";

async function shortenUrl(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const url = req.body.url;
    const shortUrl = nanoid(8);

    try {
        const result = await urlValidation.tokenValidate(token);
        if(!result.rows){
            return res.sendStatus(401);
        }

        const userId = result.rows[0].userId;

        await urlValidation.insertUrl(url, shortUrl, userId);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { shortenUrl };