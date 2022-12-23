import { nanoid } from "nanoid";
import * as urlRepository from "../repositories/urlRepository.js";

async function shortenUrl(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const url = req.body.url;
    const shortUrl = nanoid(8);

    try {
        const result = await urlRepository.tokenValidate(token);
        if(!result.rows){
            return res.sendStatus(401);
        }

        const userId = result.rows[0].userId;

        await urlRepository.insertUrl(url, shortUrl, userId);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function getUrlId(req, res){
    const { id } = req.params;

    try {
        const result = await urlRepository.consultUrlId(id);
        console.log(result);
        if(!result){
            return res.sendStatus(404);
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function openShortUrl(req, res){
    const { urlShort } = req.params;
    try {
        const url = await urlRepository.getUrl(urlShort)

        return res.redirect(url.rows[0].url)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export { shortenUrl, getUrlId, openShortUrl };