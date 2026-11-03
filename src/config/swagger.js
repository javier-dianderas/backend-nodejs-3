import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./index.js";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Shipnow API",
            version: "1.0.0",
            description: "Usuarios, comercios, pedidos, entregas, mocks, logger"
        },
        servers: [
            { url: `http://localhost:${config.port}` }
        ]
    },
    apis: ["./src/docs/swagger.yaml"]
});

export default swaggerSpec;