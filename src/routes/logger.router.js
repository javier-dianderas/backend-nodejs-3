import { Router } from "express";
import { getLoggerTest } from "../controllers/logger.controller.js";

const router = Router();

router.get("/test", getLoggerTest);

export default router;