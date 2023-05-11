import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
// import { db } from "./db/database.js";



const app = express();

//미들웨어 등록
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// router
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500)
});

// db.getConnection().then((connection) => console.log(connection));

sequelize.sync().then(() => {
    // console.log(client);
    const server = app.listen(config.host.port);   
    initSocket(server);
})

