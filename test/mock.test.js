import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";

describe("mock testing", () => {

    it("obtener users mock - ok", async () => {

        const response = await request(app).get("/api/mocks/users").query({
            qty: 10
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
    });

    it("obtener users mock - invalid mock quantity", async () => {

        const response = await request(app).get("/api/mocks/users").query({
            qty: -1
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("qty debe ser un número entero mayor a 0");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
    });

    it("obtener users mock - invalid mock quantity max", async () => {

        const response = await request(app).get("/api/mocks/users").query({
            qty: 500
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.contains("qty no puede superar");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY_MAX");
    });

    it("obtener orders mock - ok", async () => {

        const response = await request(app).get("/api/mocks/orders").query({
            qty: 10
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
    });

    it("obtener orders mock - invalid mock quantity", async () => {

        const response = await request(app).get("/api/mocks/orders").query({
            qty: -1
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("qty debe ser un número entero mayor a 0");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
    });

    it("obtener orders mock - invalid mock quantity max", async () => {

        const response = await request(app).get("/api/mocks/orders").query({
            qty: 500
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.contains("qty no puede superar");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY_MAX");
    });

    it("obtener deliveries mock - ok", async () => {

        const response = await request(app).get("/api/mocks/deliveries").query({
            qty: 10
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
    });

    it("obtener deliveries mock - invalid mock quantity", async () => {

        const response = await request(app).get("/api/mocks/deliveries").query({
            qty: -1
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("qty debe ser un número entero mayor a 0");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
    });

    it("obtener deliveries mock - invalid mock quantity max", async () => {

        const response = await request(app).get("/api/mocks/deliveries").query({
            qty: 500
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.contains("qty no puede superar");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY_MAX");
    });

    it("obtener stores mock - ok", async () => {

        const response = await request(app).get("/api/mocks/stores").query({
            qty: 10
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
    });

    it("obtener stores mock - invalid mock quantity", async () => {

        const response = await request(app).get("/api/mocks/stores").query({
            qty: -1
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("qty debe ser un número entero mayor a 0");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
    });

    it("obtener stores mock - invalid mock quantity max", async () => {

        const response = await request(app).get("/api/mocks/stores").query({
            qty: 500
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.contains("qty no puede superar");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY_MAX");
    });

    it("generar seed mock - ok", async () => {

        const qty = 50;
        const response = await request(app).post("/api/mocks/seed").query({
            qty: qty
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("users");
        expect(response.body.payload).to.have.property("orders");
        expect(response.body.payload).to.have.property("deliveries");
        expect(response.body.payload).to.have.property("stores");
        expect(response.body.payload.users).to.equal(qty);
        expect(response.body.payload.orders).to.equal(qty);
        expect(response.body.payload.deliveries).to.equal(qty);
        expect(response.body.payload.stores).to.equal(qty);

    });

    it("generar seed mock - invalid mock quantity", async () => {

        const response = await request(app).post("/api/mocks/seed").query({
            qty: -1
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("qty debe ser un número entero mayor a 0");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
    });

    it("generar seed mock - invalid mock quantity max", async () => {

        const response = await request(app).post("/api/mocks/seed").query({
            qty: 500
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.contains("qty no puede superar");
        expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY_MAX");
    });

});