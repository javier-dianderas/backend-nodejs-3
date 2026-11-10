import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { describe, it } from "mocha";

describe("swagger testing", () => {

    it("validar sitio de documentación - ok", async () => {

        const response = await request(app).get("/api/docs/");
        
        expect(response.statusCode).to.equal(200);        
        expect(response.type).to.equal("text/html");

    });

});