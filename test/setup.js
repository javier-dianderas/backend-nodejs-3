import mongoose from "mongoose";
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