import { faker } from "@faker-js/faker";
import { DELIVERY_STATUS, DELIVERY_PRIORITY } from "../utils/constants.js";

export const generateMockDelivery = (orderId, driverId) => {
    return {
        ...(orderId != null && { order: orderId }),
        ...(driverId != null && { driver: driverId }),        
        status: DELIVERY_STATUS.ASSIGNED,
        priority: DELIVERY_PRIORITY.NORMAL,
        assignedAt: new Date()
    }
}

export const generateMockDeliveries = (qty, orders, drivers) => {
    return Array.from({ length:qty}, () => generateMockDelivery(orders.length <= 0 ? null : faker.helpers.arrayElement(orders), drivers.length <= 0 ? null : faker.helpers.arrayElement(drivers)));
}