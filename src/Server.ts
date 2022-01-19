import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { createServer } from "http";
import { Server } from "socket.io";
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import passport from 'passport';
import BaseRouter from './routes/api/v1/index';
import logger from '@shared/Logger';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { chatSocket } from './websocket/chat';
const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Setting Cors
app.use(cors())

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: ["perfect", "fire"]
    })
)
app.use(passport.initialize());


// Add APIs
app.use('/api/v1', BaseRouter);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});





// createhttpServer
const httpServer = createServer(app);


//connection Socket.io
const io: Server = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

chatSocket(io);
    



// Export express instance
export { httpServer };
