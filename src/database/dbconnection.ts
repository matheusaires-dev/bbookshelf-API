import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION = process.env.DB_CONNECTION_STRING || ""

async function dbconnection() {
    await mongoose.connect(CONNECTION);
    return mongoose.connection
}

export default dbconnection;


