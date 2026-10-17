import { Router } from "express";
import { getMockUsers, getMockOrders, getMockDeliveries, getMockStores, seed} from "../controllers/mock.controller.js";

const router = Router()

router.get("/users", getMockUsers);
router.get("/orders", getMockOrders);
router.get("/deliveries", getMockDeliveries);
router.get("/stores", getMockStores);
router.post("/seed", seed);


export default router