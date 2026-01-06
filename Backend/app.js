require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth.routes');
const testRouter = require('./src/routes/test/test.routes');
const { authMiddleware } = require('./src/middlewares/auth.middleware');
const connectDB = require('./src/config/db');

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


module.exports = app;


