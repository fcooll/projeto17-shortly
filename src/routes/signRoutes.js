import express from "express";

import { validationSignIn, validationSignUp } from "../middlewares/signMiddleware.js";
import { signup, signin } from "../controllers/signController.js";

const router = express.Router();

router.post('/signup', validationSignUp, signup);
router.post('/signin', validationSignIn, signin);

export default router;