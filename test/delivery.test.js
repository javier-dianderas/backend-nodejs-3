import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";
import { ORDER_STATUS, USER_ROLES, DELIVERY_STATUS, DELIVERY_PRIORITY } from "../src/utils/constants.js";

describe("delivery testing", () => {

    let customerId;
    let driverId;
    let orderId;
    let deliveryId;

    it("crear customer", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "firstName.user.customer.delivery",
            lastName: "lastName.user.customer.delivery",
            email: "lastName.user.customer.delivery@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        customerId = response.body.payload._id;
    });

    it("crear pedido", async () => {
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
        orderId = response.body.payload._id;
        
    });

    it("crear driver", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "firstName.user.driver.delivery",
            lastName: "lastName.user.driver.delivery",
            email: "lastName.user.driver.delivery@gmail.com",
            password: "123",
            role: USER_ROLES.DRIVER
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        driverId = response.body.payload._id;
    });

    it("crear delivery - ok", async () => {
        const response = await request(app).post("/api/deliveries").send({
            order: orderId,
            driver: driverId,
            status: DELIVERY_STATUS.PENDING,
            priority: DELIVERY_PRIORITY.NORMAL
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("createdAt");
        deliveryId = response.body.payload._id;
    });

    it("crear delivery - order not found", async () => {
        const response = await request(app).post("/api/deliveries").send({
            order: "6ac57194720a3c2665d1b475",
            driver: driverId,
            status: DELIVERY_STATUS.PENDING,
            priority: DELIVERY_PRIORITY.NORMAL
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Pedido no encontrado");
        expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    });

    it("crear delivery - driver not found", async () => {
        const response = await request(app).post("/api/deliveries").send({
            order: orderId,
            driver: "6ac57194720a3c2665d1b475",
            status: DELIVERY_STATUS.PENDING,
            priority: DELIVERY_PRIORITY.NORMAL
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Repartidor no encontrado");
        expect(response.body.code).to.equal("DRIVER_NOT_FOUND");
    });

    it("crear delivery - user is not driver", async () => {
        const response = await request(app).post("/api/deliveries").send({
            order: orderId,
            driver: customerId,
            status: DELIVERY_STATUS.PENDING,
            priority: DELIVERY_PRIORITY.NORMAL
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El usuario no es driver");
        expect(response.body.code).to.equal("USER_IS_NOT_DRIVER");
    });

    it("actualizar delivery - ok", async () => {
        const status = DELIVERY_STATUS.DELIVERED;
        const priority = DELIVERY_PRIORITY.HIGH;

        const response = await request(app).put(`/api/deliveries/${deliveryId}`).send({
            order: orderId,
            driver: driverId,
            status: status,
            priority: priority
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");
        expect(response.body.payload.status).to.equal(status);
        expect(response.body.payload.priority).to.equal(priority);
    });

    it("actualizar delivery - order not found", async () => {
        const status = DELIVERY_STATUS.DELIVERED;
        const priority = DELIVERY_PRIORITY.HIGH;

        const response = await request(app).put(`/api/deliveries/6ac57194720a3c2665d1b475`).send({
            order: orderId,
            driver: driverId,
            status: status,
            priority: priority
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Entrega no encontrada");
        expect(response.body.code).to.equal("DELIVERY_NOT_FOUND");
    });

    it("obtener delivery por id - ok", async () => {
        const response = await request(app).get(`/api/deliveries/${deliveryId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("obtener delivery por id - not found", async () => {
        const response = await request(app).get(`/api/deliveries/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Entrega no encontrada");
        expect(response.body.code).to.equal("DELIVERY_NOT_FOUND");
    });

    it("obtener deliveries", async () => {
        const response = await request(app).get("/api/deliveries");

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
        response.body.payload.forEach(delivery => {
            expect(delivery).to.have.property("_id");
        });
    });

    it("eliminar delivery - ok", async () => {
        const response = await request(app).delete(`/api/deliveries/${deliveryId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("eliminar user - not found", async () => {
        const response = await request(app).delete(`/api/deliveries/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Entrega no encontrada");
        expect(response.body.code).to.equal("DELIVERY_NOT_FOUND");
    });

});