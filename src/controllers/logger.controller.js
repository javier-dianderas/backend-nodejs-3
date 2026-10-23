import { loggerService } from "../services/logger.service.js";
import { successResponse } from '../utils/apiResponse.js';

export const getLoggerTest = async (req, res, next) => {
    try {
        await loggerService.getLoggerTest();
        successResponse(res, { message: "Logs generados correctamente" });
    } catch (error) {
        next(error);
    }
}