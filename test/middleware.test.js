import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";

describe("middleware testing", () => {

    it("validar not found handler - ok", async () => {

        const response = await request(app).get("/api/storess");

        expect(response.statusCode).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.equal("Ruta no encontrada");
        expect(response.body.code).to.equal("ROUTE_NOT_FOUND");

    });
    
});