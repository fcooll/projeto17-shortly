import express from "express";

import { validateUrl } from "../middlewares/urlMiddleware.js";
import { shortenUrl, getUrlId, openShortUrl } from "../controllers/urlController.js";

const urlRouter = express.Router();

urlRouter.post('/urls/shorten', validateUrl, shortenUrl);
urlRouter.get('/urls/:id', getUrlId);
urlRouter.get('/urls/open/:shortUrl', openShortUrl);

export default urlRouter;