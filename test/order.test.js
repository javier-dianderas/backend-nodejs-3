import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";
import { ORDER_STATUS, USER_ROLES } from "../src/utils/constants.js";
import { fixtures } from "./helpers/fixtures.js";
import path from "node:path";
import fs from "node:fs";

describe("order testing", () => {

    let customerId;
    let storeId;
    let orderId;

    it("crear customer", async () => {
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

    it("crear store", async () => {
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

    it("crear pedido - ok", async () => {
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

        orderId = response.body.payload._id;
        
    });

    it("crear pedido - customer not found", async () => {
        const response = await request(app).post("/api/orders").send({
            customer: "6ac57194720a3c2665d1b475",
            deliveryAddress: "avenida 123",
            items: [
                {
                    name: "item1",
                    quantity: 2,
                    price: 200
                }
            ]
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El cliente especificado no existe");
        expect(response.body.code).to.equal("CUSTOMER_NOT_FOUND");       
    });

    it("crear pedido - order must have one item", async () => {
        const response = await request(app).post("/api/orders").send({
            customer: customerId,
            deliveryAddress: "avenida 123",
            items: []
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El pedido debe tener al menos un item");
        expect(response.body.code).to.equal("ORDER_MUST_HAVE_ONE_ITEM");
    });

    it("actualizar pedido - ok", async () => {
        const deliveryAddress = "avenida 123 mod";

        const response = await request(app).put(`/api/orders/${orderId}`).send({
            customer: customerId,
            deliveryAddress: deliveryAddress,
            items: [
                {
                    name: "item1",
                    quantity: 2,
                    price: 200
                }
            ]
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");
        expect(response.body.payload.deliveryAddress).to.equal(deliveryAddress);

        orderId = response.body.payload._id;
        
    });

    it("actualizar pedido - not found", async () => {
        const deliveryAddress = "avenida 123 mod";

        const response = await request(app).put(`/api/orders/6ac57194720a3c2665d1b475`).send({
            customer: customerId,
            deliveryAddress: deliveryAddress,
            items: [
                {
                    name: "item1",
                    quantity: 2,
                    price: 200
                }
            ]
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Pedido no encontrado");
        expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    });

    it("agregar prueba de entrega al pedido - ok", async () => {
        const type = "delivery_proof";

        const response = await request(app).post(`/api/orders/${orderId}/proof`)
            .field("type", type)
            .attach("proof", fixtures.valido);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");

        const proof = response.body.payload.proof;

        expect(proof).to.have.property("originalName");
        expect(proof).to.have.property("fileName");
        expect(proof).to.have.property("path");
        expect(proof).to.have.property("mimeType");
        expect(proof).to.have.property("size");
        expect(proof).to.have.property("type");
        expect(proof).to.have.property("uploadedAt");

        expect(proof.type).to.equal(type);
        const filePath = path.resolve(proof.path);
        expect(fs.existsSync(filePath)).to.be.true;
    });

    it("agregar prueba de entrega al pedido - file required", async () => {
        const type = "delivery_proof";

        const response = await request(app).post(`/api/orders/${orderId}/proof`)
            .field("type", type);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Debes adjuntar un archivo");
        expect(response.body.code).to.equal("FILE_REQUIRED");
    });

    it("agregar prueba de entrega al pedido - invalid document type", async () => {
        const type = "delivery_proofs";

        const response = await request(app).post(`/api/orders/${orderId}/proof`)
            .field("type", type)
            .attach("proof", fixtures.valido);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Tipo de documento inválido");
        expect(response.body.code).to.equal("INVALID_DOCUMENT_TYPE");
    });

    it("agregar prueba de entrega al pedido - invalid upload", async () => {
        const type = "delivery_proof";

        const response = await request(app).post(`/api/orders/${orderId}/proof`)
            .field("type", type)
            .attach("proof", fixtures.valido)
            .attach("proof", fixtures.valido);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Campo de archivo o cantidad no permitida");
        expect(response.body.code).to.equal("INVALID_UPLOAD");
    });

    it("agregar prueba de entrega al pedido - order not found", async () => {
        const type = "delivery_proof";

        const response = await request(app).post(`/api/orders/6ac57194720a3c2665d1b475/proof`)
            .field("type", type)
            .attach("proof", fixtures.valido);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Pedido no encontrado");
        expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    });

    it("agregar prueba de entrega al pedido - file too large", async () => {
        const type = "delivery_proof";

        const response = await request(app).post(`/api/orders/${orderId}/proof`)
            .field("type", type)
            .attach("proof", fixtures.tamanioInvalido);

        expect(response.statusCode).to.equal(413);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El archivo supera el límite máximo");
        expect(response.body.code).to.equal("FILE_TOO_LARGE");
    });

    it("obtener pedido por id - ok", async () => {
        const response = await request(app).get(`/api/orders/${orderId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("obtener pedido por id - not found", async () => {
        const response = await request(app).get(`/api/orders/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Pedido no encontrado");
        expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    });

    it("obtener pedidos", async () => {
        const response = await request(app).get("/api/orders");

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
        response.body.payload.forEach(order => {
            expect(order).to.have.property("_id");
        });
    });

    it("eliminar pedido - ok", async () => {
        const response = await request(app).delete(`/api/orders/${orderId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("eliminar pedido - not found", async () => {
        const response = await request(app).delete(`/api/orders/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Pedido no encontrado");
        expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    });

});