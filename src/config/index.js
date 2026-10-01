import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "SHIPPING_API_KEY"
];

for (const envVar of requiredEnvVars) {
    if(!process.env[envVar]) {
        const error = new Error(`Variable de entorno requerida no definida: ${envVar}`);
        error.statusCode = 500;
        throw error;
    }
}

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    isProd: process.env.NODE_ENV === "production",
    mongoDbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    shippingApiKey: process.env.SHIPPING_API_KEY
}