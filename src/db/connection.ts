import mongoose from "mongoose";
import { config } from "../../config";

export async function connectToDatabase() {
    // check if db is already connected (1 = connected)
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(config.database.dbDSN, { dbName: config.database.chatDBName });
        console.log("connected to db");
        return;
    }
}
