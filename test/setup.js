import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// dotenv.config({ path: path.resolve(__dirname, "../.env.test")});

const uri = process.env.MONGODB_URI;

before(async () => {
    if(!uri) {
        throw new Error("Falta uri de mongo")        
    }
    await mongoose.connect(uri);
})

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
})