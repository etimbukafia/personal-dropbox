// IMPORTS
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import config from 'config';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import { error } from 'console';


dotenv.config()

// VARIABLES
//const upload: Multer = multer({ storage: storage });  // multer for file storage
const app: Express = express();
const port = process.env.PORT || 4000;
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });   // Use memory storage to handle the file in-memory
const connectionString = process.env.MONGO_URI;

// APP METHODS
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // middleware function in Express.js that parses incoming requests with URL-encoded payloads. This is to handle form submissions
app.set("view engine", "ejs"); // Template engine to generate HTML dynamically using templates
//ROUTES

// code for uploading files
// upload.single(‘file’): This middleware from multer handles single file uploads named “file” in the request

if (!connectionString) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose.connect(connectionString)
    .then(() => {
        app.listen(port, () => {
            console.log('RUNNING ON PORT 4000')
        })
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error)
    })


const uploadFiles = (req: Request, res: Response) => {
    try {
        res.status(200).json({ success: "file uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: error })
    }
};



app.post('/upload_files', uploadFiles);

app.listen(port, () => {
    console.log('RUNNING ON PORT 4000')
});