// IMPORTS
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer, { Multer } from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import config from 'config';
import { Readable } from 'stream';


// VARIABLES
//const upload: Multer = multer({ storage: storage });  // multer for file storage
const app: Express = express();
const port = process.env.port || 4000;

// APP METHODS
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // middleware function in Express.js that parses incoming requests with URL-encoded payloads. This is to handle form submissions
app.set("view engine", "ejs"); // Template engine to generate HTML dynamically using templates
//ROUTES

// code for uploading files
// upload.single(‘file’): This middleware from multer handles single file uploads named “file” in the request
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