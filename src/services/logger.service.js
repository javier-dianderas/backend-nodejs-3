import logger from "../config/logger.js";

export const loggerService = {
    getLoggerTest: async() => {
        logger.debug('Log de nivel debug');
        logger.http('Log de nivel http');
        logger.info('Log de nivel info');
        logger.warning('Log de nivel warning');
        logger.error('Log de nivel error');
        logger.fatal('Log de nivel fatal');
    }
}