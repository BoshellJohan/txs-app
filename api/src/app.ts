import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRouter from './modules/auth/auth.routes.js';
import usersRouter from './modules/users/users.routes.js'
import passwordRouter from './modules/password/password.routes.js'

import { authMiddleware } from './middlewares/auth.middleware.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import pino from 'pino';

// const logger = pino({
//     level: process.env.LOG_LEVEL || "info", //Silent, trace, debug, info, warn, error, fatal
//     timestamp: pino.stdTimeFunctions.isoTime,
//     formatters: {
//     level(label) {
//       return { level: label };
//     },
//     },
// })

const logger = pino()

const app = express();

const asyncLocalStorage: unknown = new AsyncLocalStorage();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

app.use(express.json());

app.use((req, res, next) => {
    const start = performance.now();
    const requestId = req.headers["x-request-id"] || randomUUID();

    const { method, url, ip, headers } = req;
    const userAgent = headers["user-agent"];

    const reqLogger = logger.child({
        "request.id": requestId,
    });

    reqLogger.info({
        "http.request.method": method,
        "url.path": url,
        "client.address": ip,
        "user_agent.original": userAgent,
    },
        `incoming ${method} request to ${url}`,
    );

    res.on("finish", () => {
        const {statusCode} = res;
        const logData = {
            duration_ms: performance.now() - start,
            status_code: statusCode,
        };

        if(statusCode >= 500){
            reqLogger.error(logData, "server error");
        } else if(statusCode >= 400){
            reqLogger.warn(logData, "client error");
        } else {
            reqLogger.info(logData, "request completed");
        }
    });

    withLogContext({ "request.id": requestId }, next);
});

export function getLogger() {
    return (asyncLocalStorage as any).getStore()?.get("logger") || logger;
}

export function withLogContext(data: any, callback: any) {
  const store = (asyncLocalStorage as any).getStore();
  // Get the logger from the current context, or fall back to the base logger
  const parentLogger = store?.get("logger") || logger;

  // Create a new child logger with the new data
  const childLogger = parentLogger.child(data);

  // Create a new store that inherits from the parent context
  const newStore = new Map(store);
  // Replace the logger with our new, more specific child logger
  newStore.set("logger", childLogger);

  // Run the callback within the new, enriched context
  return (asyncLocalStorage as any).run(newStore, callback);
}


app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/password', passwordRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: 'Ruta protegida', user: req.user})
});

app.use(errorHandler);

export default app;


