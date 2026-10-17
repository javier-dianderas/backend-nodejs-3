import { faker } from "@faker-js/faker"
import { USER_ROLES } from "../utils/constants.js"


export const generateMockUser = () =>{

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const userName = faker.internet.username({firstName, lastName})
    const email = `${userName}.${faker.string.alphanumeric(5)}@shipnow.test`.toLowerCase();

    const password = "coder123!"

    return {
        firstName,
        lastName,
        email,
        password,
        role : faker.helpers.weightedArrayElement([
            { weight: 3, value: USER_ROLES.CUSTOMER },
            { weight: 1, value: USER_ROLES.DRIVER },
            { weight: 1, value: USER_ROLES.STORE }
        ])
    }
}

export const generateMockUsers = (qty)=>{
    return Array.from({length:qty}, generateMockUser)
}