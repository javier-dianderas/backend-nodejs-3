import { faker } from "@faker-js/faker";
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../utils/constants.js";

export const generateMockOrder = (customerId) => {

    const items = Array.from(
        { length: faker.number.int({ min: 1, max:3 })},
        () => ({
            name: faker.helpers.arrayElement(["Paquete pequeño", "Paquete mediano", "Paquete grande"]),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: faker.number.float({ min: 10, max: 100, fractionDigits: 1 })
        })
    )

    const total = items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
    }, 0);

    return {
        ...(customerId != null && { customer: customerId }),
        items,
        deliveryAddress: faker.location.streetAddress(),
        total,
        status: ORDER_STATUS.CREATED,
        priority: DELIVERY_PRIORITY.NORMAL
    } 
}

export const generateMockOrders = (qty, customers) => {
    return Array.from({length:qty}, () => generateMockOrder(customers.length <= 0 ? null : faker.helpers.arrayElement(customers)));
}