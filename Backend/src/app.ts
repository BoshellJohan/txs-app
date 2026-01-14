import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRouter from './modules/auth/auth.routes.js';
import testRouter from './modules/test/test.routes.js';
import { authMiddleware } from './modules/auth/auth.middleware.js';
import { connectDB } from './config/db.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

app.use(express.json());
connectDB();

app.use('/auth', authRouter);
app.use('/test', testRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: 'Ruta protegida', user: req.user})
});


export default app;


