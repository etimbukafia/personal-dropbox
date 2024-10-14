import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const connectionString = process.env.MONGO_URI;

if (!connectionString) {
    throw new Error("MONGO_URI environment variable is not defined");
}

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of waiting indefinitely
        });
        console.log("Connected to mongo db atlas");
    } catch (error) {
        console.error("Error connecting to MongoDb Atlas:", error);
        process.exit(1) // Exit the process with a failure code
    }
};

export default connectToDB;