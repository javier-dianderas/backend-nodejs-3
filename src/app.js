import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import deliveriesRouter from './routes/deliveries.js';
import mocksRouter from "./routes/mocks.js"
import { config } from './config/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/deliveries', deliveriesRouter);
// Como evitar que este endpoint sea utilizable en un entorno productivo
if(config.nodeEnv !== "production") {
    app.use("/api/mocks", mocksRouter);
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString()});
});

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

// errores pasados con next(error)
app.use((err, req, res, next) => {
    // ids mal formados o validaciones de Mongoose son errores del cliente
    const isClientError = err.name === 'CastError' || err.name === 'ValidationError';
    const statusCode = err.statusCode || (isClientError ? 400 : 500);

    const message = err.name === 'CastError' ? 'ID inválido' : err.message;
    console.log(err);
    res.status(statusCode).json({
        status: 'error',
        message: message || 'Error interno del servidor'
    });
});

export default app;