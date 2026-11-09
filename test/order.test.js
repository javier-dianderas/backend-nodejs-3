import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { ORDER_STATUS, USER_ROLES } from "../src/utils/constants.js";
import { describe, it } from "mocha";


describe("Flujo user -> store -> order", () => {

    let customerId;
    let storeId;

    it("deberia crear un customer", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "test",
            lastName: "test2",
            email: "test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload.firstName).to.equal("test");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload.role).to.equal(USER_ROLES.CUSTOMER);

        customerId = response.body.payload._id;
    });

    it("deberia crear un store", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "test2",
            lastName: "store",
            email: "test-store@gmail.com",
            password: "123",
            role: USER_ROLES.STORE
        });

        expect(response.statusCode).to.equal(201);
        const ownerId = response.body.payload._id;

        const storeResponse = await request(app).post("/api/stores").send({
            name: "kiosko",
            address: "avenida 123",
            owner: ownerId
        });

        expect(storeResponse.statusCode).to.equal(201);
        expect(storeResponse.body.status).to.equal("success");
        expect(storeResponse.body.payload.name).to.equal("kiosko");
        expect(storeResponse.body.payload).to.have.property("_id");

        storeId = storeResponse.body.payload._id;
    });

    it("deberia crear un order", async () => {
        const response = await request(app).post("/api/orders").send({
            customer: customerId,
            deliveryAddress: "avenida 123",
            items: [
                {
                    name: "item1",
                    quantity: 2,
                    price: 200
                }
            ]
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload.total).to.equal(410);
        expect(response.body.payload.status).to.equal(ORDER_STATUS.CREATED);
        
    });

})