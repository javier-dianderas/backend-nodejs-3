import { mockService } from "../services/mocks.service.js";

export const getMockUsers = (req, res, next) => {
    try{
        const users = mockService.getMockUsers(req.query.qty);
        res.json({status: "success", payload: users});
    }catch(error){
        next(error);
    }
}

export const getMockOrders = (req, res, next) => {
    try {
        const orders = mockService.getMockOrders(req.query.qty);
        res.json({status: "success", payload: orders});
    } catch (error) {
        next(error);
    }
}

export const getMockDeliveries = (req, res, next) => {
    try {
        const deliveries = mockService.getMockDeliveries(req.query.qty);
        res.json({status: "success", payload: deliveries});
    } catch (error) {
        next(error);
    }
}

export const seed = async (req, res, next) => {
    try{
        // qty por query (?qty=10) o por body ({ "qty": 10 }); sin qty usa el default
        const qty = req.query.qty ?? req.body?.qty
        const inserted = await mockService.seed(qty)
        res.status(201).json({status: "success", payload: inserted})
    }catch(error){
        next(error)
    }
}