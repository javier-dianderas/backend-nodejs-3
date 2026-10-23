import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./index.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "cyan",
        debug: "blue"
    }
};

winston.addColors(customLevels.colors);

const logFormat = winston.format.printf(({ timestamp, level, message}) => {
    return `${timestamp} [${level}] ${message}`;
})

const logger = winston.createLogger({
    levels: customLevels.levels,
    level: config.isProd ? config.loggerLevel : "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"})
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
                logFormat
            )
        }),
        new DailyRotateFile({
            filename: "logs/errors-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "debug",
            maxFiles: "14d",
            format: logFormat
        })
    ]
});

export default logger;