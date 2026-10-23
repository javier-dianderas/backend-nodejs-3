import logger from "../config/logger.js";
import { createError, errorResponse } from "../utils/apiResponse.js";
import { ERROR_CODES, ERROR_DICTIONARY } from "../utils/errorDictionary.js";

export const errorHandler = (error, req, res, next) => {
    let handledError = error;    
    if(error.name === "CastError") {
        handledError = createError(ERROR_CODES.VALIDATION_ERROR, "ID inválido");
    }

    const statusCode = handledError.statusCode || ERROR_DICTIONARY[ERROR_CODES.INTERNAL_SERVER_ERROR].statusCode;    
    const code = handledError.code || ERROR_CODES.INTERNAL_SERVER_ERROR;
    const line = `${code} - ${handledError.message} - ${req.method} ${req.originalUrl}`;

    if(statusCode >= 500) {
        logger.error(line);
    } else {
        logger.warning(line);
    }

    return errorResponse(res, handledError);
}