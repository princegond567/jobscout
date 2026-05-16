import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("Missing MONGO_URI or MONGODB_URI environment variable");
        }

        const normalizedMongoUri = mongoUri.endsWith("/") ? mongoUri.slice(0, -1) : mongoUri;
        const connectionString = normalizedMongoUri.includes(`/${DB_NAME}`)
            ? normalizedMongoUri
            : `${normalizedMongoUri}/${DB_NAME}`;

        const connctionInstance = await mongoose.connect(connectionString)
        console.log((`\nMongoDB connected!! DB HOST: ${connctionInstance.connection.host}`));
    } catch (error) {
        console.log("MongoDB connection FAILED : ", error);
        process.exit(1)
    }   
}

export default connectDB