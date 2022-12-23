import express from "express";

import { validationSignUp } from "../middlewares/signMiddleware.js";
import { signup } from "../controllers/signController.js";

const router = express.Router();

router.post('/signup', validationSignUp, signup);

export default router;