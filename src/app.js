import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.router.js';
import ordersRouter from './routes/orders.router.js';
import deliveriesRouter from './routes/deliveries.router.js';
import mocksRouter from "./routes/mocks.router.js";
import storesRouter from "./routes/stores.router.js";
import loggerRouter from "./routes/logger.router.js";
import { config } from './config/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { httpLogger } from './middlewares/httpLogger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/deliveries', deliveriesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/logger', loggerRouter);

if(config.nodeEnv !== "production") {
    app.use("/api/mocks", mocksRouter);
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString()});
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;