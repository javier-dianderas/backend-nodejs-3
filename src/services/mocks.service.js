import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";
import { generateMockDeliveries } from "../mocks/delivery.mock.js";
import { userRepository } from "../repositories/user.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { deliveryRepository } from "../repositories/delivery.repository.js";
import { AppError } from "../utils/errors.js";
import { USER_ROLES } from "../utils/constants.js";

const MAX_MOCK_ITEMS = 400
const DEFAULT_MOCK_ITEMS = 10

// qty puede llegar como texto (query string) o número (body)
const validateQty = (qty = DEFAULT_MOCK_ITEMS) =>{
    const parsedQty = Number(qty)
    if(!Number.isInteger(parsedQty) || parsedQty < 0){
        throw new AppError(`qty debe ser un número entero mayor o igual a 0`, 400);
    }

    if(parsedQty > MAX_MOCK_ITEMS){
        throw new AppError(`qty no puede superar ${MAX_MOCK_ITEMS}`, 400)
    }

    return parsedQty
}


export const mockService = {
    getMockUsers: (qty) => {
        return generateMockUsers(validateQty(qty))
    },

    getMockOrders: (qty) => {        
        return generateMockOrders(validateQty(qty), []);
    },

    getMockDeliveries: (qty) => {
        return generateMockDeliveries(validateQty(qty), [], []);
    },

    seed: async(qty)=>{
        const parsedQty = validateQty(qty)

        if(parsedQty === 0){
            throw new AppError("qty debe ser mayor a 0", 400)
        }

        const createdUsers = await userRepository.insertMany(generateMockUsers(parsedQty))

        const customers = createdUsers.filter(u => u.role === USER_ROLES.CUSTOMER);
        const customersIds = customers.map(c => c._id);
        const createdOrders = await orderRepository.insertMany(generateMockOrders(validateQty(qty), customersIds));

        const ordersIds = createdOrders.map(o => o._id);
        const drivers = createdUsers.filter(u => u.role === USER_ROLES.DRIVER);
        const driversIds = drivers.map(c => c._id);
        const createdDeliveries = await deliveryRepository.insertMany(generateMockDeliveries(validateQty(qty), ordersIds, driversIds))

        return {
            users: createdUsers.length,
            orders: createdOrders.length,
            deliveries: createdDeliveries.length
        };
    }
}
