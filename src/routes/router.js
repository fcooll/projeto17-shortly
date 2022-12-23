import express from 'express';

import signRoutes from "./signRoutes.js";
import urlRoutes from "./urlRoutes.js"

const router = express.Router();

router.use(signRoutes);
router.use(urlRoutes);

export default router;