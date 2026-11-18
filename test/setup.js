import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";

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

    try {
        fs.rmSync(path.resolve("uploads/test"), {
            recursive: true,
            force: true
        });
    } catch (error) {
        console.error("Error eliminando archivos:", error);
    }    
})