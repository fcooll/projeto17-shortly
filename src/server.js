import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import signRoutes from "./routes/signRoutes.js"
import ulrRoutes from "./routes/urlRoutes.js"

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.get('/status', (req, res) => {
    res.send(`It's alive!`);
});

server.use(signRoutes);
server.use(ulrRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});