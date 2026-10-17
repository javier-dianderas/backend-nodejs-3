import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";
import { generateMockDeliveries } from "../mocks/delivery.mock.js";
import { generateMockStores } from "../mocks/store.mock.js";
import { userRepository } from "../repositories/user.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { deliveryRepository } from "../repositories/delivery.repository.js";
import { storeRepository } from "../repositories/store.repository.js";
import { USER_ROLES } from "../utils/constants.js";
import { createError } from "../utils/apiResponse.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
import { MAX_MOCK_ITEMS, DEFAULT_MOCK_ITEMS } from "../utils/constants.js";

// qty puede llegar como texto (query string) o número (body)
const validateQty = (qty = DEFAULT_MOCK_ITEMS) =>{
    const parsedQty = Number(qty)
    if(!Number.isInteger(parsedQty) || parsedQty < 0){
        throw createError(ERROR_CODES.INVALID_MOCK_QUANTITY);
    }

    if(parsedQty > MAX_MOCK_ITEMS){
        throw createError(ERROR_CODES.INVALID_MOCK_QUANTITY_MAX);
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

    getMockStores: (qty) => {
        return generateMockStores(validateQty(qty), []);
    },

    seed: async(qty)=>{
        const parsedQty = validateQty(qty)

        if(parsedQty === 0){
            throw createError(ERROR_CODES.INVALID_MOCK_QUANTITY);
        }

        const createdUsers = await userRepository.insertMany(generateMockUsers(parsedQty))

        const customers = createdUsers.filter(u => u.role === USER_ROLES.CUSTOMER);
        const customersIds = customers.map(c => c._id);
        const createdOrders = await orderRepository.insertMany(generateMockOrders(validateQty(qty), customersIds));

        const ordersIds = createdOrders.map(o => o._id);
        const drivers = createdUsers.filter(u => u.role === USER_ROLES.DRIVER);
        const driversIds = drivers.map(c => c._id);
        const createdDeliveries = await deliveryRepository.insertMany(generateMockDeliveries(validateQty(qty), ordersIds, driversIds));

        const owners = createdUsers.filter(u => u.role === USER_ROLES.STORE);
        const ownersIds = owners.map(c => c._id);
        const createdStores = await storeRepository.insertMany(generateMockStores(validateQty(qty), ownersIds));

        return {
            users: createdUsers.length,
            orders: createdOrders.length,
            deliveries: createdDeliveries.length,
            stores: createdStores.length
        };
    }
}
