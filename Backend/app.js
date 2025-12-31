const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth.routes');
const { authMiddleware } = require('./src/middlewares/auth.middleware');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

app.use(express.json());

app.use('/auth', authRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: 'Ruta protegida', user: req.user})
});


module.exports = app;


