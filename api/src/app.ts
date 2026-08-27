import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRouter from './modules/auth/auth.routes.js';
import usersRouter from './modules/users/users.routes.js'
import passwordRouter from './modules/password/password.routes.js'

import { authMiddleware } from './middlewares/auth.middleware.js';
import { errorHandler } from './common/middleware/errorHandler.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/password', passwordRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: 'Ruta protegida', user: req.user})
});

app.use(errorHandler);

export default app;


