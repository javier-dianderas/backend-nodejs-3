import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";

describe("logger testing", () => {

    it("validar logger - ok", async () => {

        const response = await request(app).get("/api/logger/test");

        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Logs generados correctamente");

    });
    
});