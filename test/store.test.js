import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";
import { USER_ROLES } from "../src/utils/constants.js";

describe("store testing", async () => {

    let storeId;
    let ownerId;
    let customerId;

    it("crear customer", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "firstName.user.customer.store",
            lastName: "lastName.user.customer.store",
            email: "lastName.user.customer.store@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        customerId = response.body.payload._id;
    });

    it("crear owner", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "firstName.user.store.delivery",
            lastName: "lastName.user.store.delivery",
            email: "lastName.user.store.delivery@gmail.com",
            password: "123",
            role: USER_ROLES.STORE
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        ownerId = response.body.payload._id;
    });

    it("crear store - ok", async () => {
        const response = await request(app).post("/api/stores").send({
            name: "store.name.test",
            address: "store.address.test",
            owner: ownerId,
            isActive: true
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("createdAt");
        storeId = response.body.payload._id;
    });

    it("crear store - validation error", async () => {
        const response = await request(app).post("/api/stores").send({
            address: "store.address.test",
            owner: ownerId,
            isActive: true
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Faltan campos obligatorios");
        expect(response.body.code).to.equal("VALIDATION_ERROR");
    });

    it("crear store - owner not found", async () => {
        const response = await request(app).post("/api/stores").send({
            name: "store.name.test",
            address: "store.address.test",
            owner: "6ac57194720a3c2665d1b475",
            isActive: true
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Propietario no encontrado");
        expect(response.body.code).to.equal("OWNER_NOT_FOUND");
    });

    it("crear store - owner must be store role", async () => {
        const response = await request(app).post("/api/stores").send({
            name: "store.name.test",
            address: "store.address.test",
            owner: customerId,
            isActive: true
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El propietario debe tener rol store");
        expect(response.body.code).to.equal("OWNER_MUST_BE_STORE_ROLE");
    });

    it("actualizar store - ok", async () => {
        const name = "store.name.test mod";
        const address = "store.address.test mod";

        const response = await request(app).put(`/api/stores/${storeId}`).send({
            name: name,
            address: address,
            owner: ownerId,
            isActive: true
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");
        expect(response.body.payload.name).to.equal(name);
        expect(response.body.payload.address).to.equal(address);
    });

    it("actualizar store - not found", async () => {
        const name = "store.name.test mod";
        const address = "store.address.test mod";

        const response = await request(app).put(`/api/stores/6ac57194720a3c2665d1b475`).send({
            name: name,
            address: address,
            owner: ownerId,
            isActive: true
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Comercio no encontrado");
        expect(response.body.code).to.equal("STORAGE_NOT_FOUND");
    });

    it("obtener store por id - ok", async () => {
        const response = await request(app).get(`/api/stores/${storeId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("obtener store por id - not found", async () => {
        const response = await request(app).get(`/api/stores/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Comercio no encontrado");
        expect(response.body.code).to.equal("STORAGE_NOT_FOUND");
    });

    it("obtener stores", async () => {
        const response = await request(app).get("/api/stores");

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
        response.body.payload.forEach(store => {
            expect(store).to.have.property("_id");
        });
    });

    it("eliminar store - ok", async () => {
        const response = await request(app).delete(`/api/stores/${storeId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("eliminar store - not found", async () => {
        const response = await request(app).delete(`/api/stores/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Comercio no encontrado");
        expect(response.body.code).to.equal("STORAGE_NOT_FOUND");
    });

})