import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()

export class Connection {
    static async connect() {
        try {
            await mongoose.connect(process.env.DB_URI as string);
            console.log('Dabatase connected');
            
        } catch (error) {
            throw new Error(error)
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
        } catch (error) {
            throw new Error(error)
        }
    }
}
