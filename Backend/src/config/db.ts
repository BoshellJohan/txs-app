import mongoose from 'mongoose';
import { requiredEnv } from '../utils/env.js';

export const connectDB = async() => {
    try {
        await mongoose.connect(requiredEnv('MONGO_URI'));
        console.log("MongoDB conectado");
    }
    catch(err){
        console.log("Mongo error, ", err);
        process.exit(1);
    }
}
