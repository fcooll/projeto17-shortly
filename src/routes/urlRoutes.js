import express from "express";

import { validateUrl } from "../middlewares/urlMiddleware.js";
import { shortenUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post('/urls/shorten', validateUrl, shortenUrl);

export default router;