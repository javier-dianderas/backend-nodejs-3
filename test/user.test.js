import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";
import { USER_ROLES } from "../src/utils/constants.js";
import { fixtures } from "./helpers/fixtures.js";
import path from "node:path";
import fs from "node:fs";

describe("user testing", () => {

    let userId;

    it("crear user - ok", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "customer.name.test",
            lastName: "customer.lastname.test",
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload.role).to.equal(USER_ROLES.CUSTOMER);

        userId = response.body.payload._id;
    });

    it("crear user - validation error", async () => {
        const response = await request(app).post("/api/users").send({
            lastName: "customer.lastname.test",
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Faltan campos obligatorios");
        expect(response.body.code).to.equal("VALIDATION_ERROR");
    });

    it("crear user - invalid user role", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "customer.name.test",
            lastName: "customer.lastname.test",
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: "temporal"
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Rol inválido");
        expect(response.body.code).to.equal("INVALID_USER_ROLE");
    });

    it("crear user - forbidden create admin role", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "admin.name.test",
            lastName: "admin.lastname.test",
            email: "admin.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.ADMIN
        });

        expect(response.statusCode).to.equal(403);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("No se puede crear un usuario admin");
        expect(response.body.code).to.equal("FORBIDDEN_CREATE_ADMIN_ROLE");
    });

    it("crear user - user exists with email", async () => {
        const response = await request(app).post("/api/users").send({
            firstName: "customer.name.test",
            lastName: "customer.lastname.test",
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Ya existe un usuario con ese email");
        expect(response.body.code).to.equal("USER_EXISTS_WITH_EMAIL");
    });

    it("actualizar user - ok", async () => {
        const firstName = "customer.name.test.mod";
        const lastName = "customer.lastname.test.mod";

        const response = await request(app).put(`/api/users/${userId}`).send({
            firstName: firstName,
            lastName: lastName,
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");
        expect(response.body.payload.firstName).to.equal(firstName);
        expect(response.body.payload.lastName).to.equal(lastName);
        expect(response.body.payload.role).to.equal(USER_ROLES.CUSTOMER);
        
    });

    it("actualizar user - user not found", async () => {
        const firstName = "customer.name.test.mod";
        const lastName = "customer.lastname.test.mod";

        const response = await request(app).put(`/api/users/6ac57194720a3c2665d1b475`).send({
            firstName: firstName,
            lastName: lastName,
            email: "customer.lastname.test@gmail.com",
            password: "123",
            role: USER_ROLES.CUSTOMER
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Usuario no encontrado");
        expect(response.body.code).to.equal("USER_NOT_FOUND");
        
    });

    it("agregar documento al usuario - ok", async () => {
        const type = "user_document";

        const response = await request(app).post(`/api/users/${userId}/documents`)
            .field("type", type)
            .attach("document", fixtures.valido);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("updatedAt");
        expect(response.body.payload.documents).to.be.an("array").that.is.not.empty;

        const document = response.body.payload.documents.at(-1);

        expect(document).to.have.property("originalName");
        expect(document).to.have.property("fileName");
        expect(document).to.have.property("path");
        expect(document).to.have.property("mimeType");
        expect(document).to.have.property("size");
        expect(document).to.have.property("type");
        expect(document).to.have.property("uploadedAt");

        expect(document.type).to.equal(type);
        const filePath = path.resolve(document.path);
        expect(fs.existsSync(filePath)).to.be.true;
    });

    it("agregar documento al usuario - file required", async () => {
        const type = "user_document";

        const response = await request(app).post(`/api/users/${userId}/documents`)
            .field("type", type);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Debes adjuntar un archivo");
        expect(response.body.code).to.equal("FILE_REQUIRED");
    });

    it("agregar documento al usuario - invalid document type", async () => {
        const type = "user_documents";

        const response = await request(app).post(`/api/users/${userId}/documents`)
            .field("type", type)
            .attach("document", fixtures.valido);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Tipo de documento inválido");
        expect(response.body.code).to.equal("INVALID_DOCUMENT_TYPE");
    });

    it("agregar documento al usuario - invalid upload", async () => {
        const type = "user_document";

        const response = await request(app).post(`/api/users/${userId}/documents`)
            .field("type", type)
            .attach("document", fixtures.valido)
            .attach("document", fixtures.valido);

        expect(response.statusCode).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Campo de archivo o cantidad no permitida");
        expect(response.body.code).to.equal("INVALID_UPLOAD");
    });

    it("agregar documento al usuario - user not found", async () => {
        const type = "user_document";

        const response = await request(app).post(`/api/users/6ac57194720a3c2665d1b475/documents`)
            .field("type", type)
            .attach("document", fixtures.valido);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Usuario no encontrado");
        expect(response.body.code).to.equal("USER_NOT_FOUND");
    });

    it("agregar documento al usuario - file too large", async () => {
        const type = "user_document";

        const response = await request(app).post(`/api/users/${userId}/documents`)
            .field("type", type)
            .attach("document", fixtures.tamanioInvalido);

        expect(response.statusCode).to.equal(413);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("El archivo supera el límite máximo");
        expect(response.body.code).to.equal("FILE_TOO_LARGE");
    });

    it("obtener user por id - ok", async () => {
        const response = await request(app).get(`/api/users/${userId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("obtener user por id - not found", async () => {
        const response = await request(app).get(`/api/users/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Usuario no encontrado");
        expect(response.body.code).to.equal("USER_NOT_FOUND");
    });

    it("obtener users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.be.an("array").that.is.not.empty;
        response.body.payload.forEach(user => {
            expect(user).to.have.property("_id");
        });
    });

    it("eliminar user - ok", async () => {
        const response = await request(app).delete(`/api/users/${userId}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");        
        expect(response.body.payload).to.have.property("_id");
    });

    it("eliminar user - not found", async () => {
        const response = await request(app).delete(`/api/users/6ac57194720a3c2665d1b475`);

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Usuario no encontrado");
        expect(response.body.code).to.equal("USER_NOT_FOUND");
    });

});