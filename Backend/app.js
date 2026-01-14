import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRouter from './src/modules/auth/auth.routes.js';
import testRouter from './src/modules/test/test.routes.js';
import { authMiddleware } from './src/modules/auth/auth.middleware.js';
import { connectDB } from './src/config/db.js';


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


