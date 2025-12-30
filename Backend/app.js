const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

app.use(express.json());

app.use('/auth', authRouter);

module.exports = app;


