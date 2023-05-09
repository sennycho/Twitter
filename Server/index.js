import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
// import { Server } from "socket.io";
import { initSocket } from "./connection/socket.js";


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

app.use((error, req, res, next) =>{
    console.log(error);
    res.sendStatus(500)
});

const server = app.listen(config.host.port);
initSocket(server);

// const socketIO = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });

// socketIO.on('connection', () => {
//     console.log('클라이언트 연결 성공!');
//     socketIO.emit('dwitter', 'Hello💖');   //이 소켓에 접속한 클라이언트에게 이벤트를 발생시킴
// })

// setInterval(() => {
//     socketIO.emit('dwitter', 'Hello💖💖💖💖💖');
// }, 1000)


