// IMPORTS
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import uploadToCloudinary from './upload.js';
import mongoose from 'mongoose';
import Media from './models/Media.js'


dotenv.config();

// VARIABLES
const app: Express = express();
const PORT = process.env.PORT || 4000;
const upload = multer({ storage: multer.memoryStorage() });   // Use memory storage to handle the file in-memory
const connectionString = process.env.MONGO_URI;
// const PORT = await getPort()

async function startServer() {
    if (!connectionString) {
        throw new Error("Mongo URI environmental variable is not defined")
    }
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to Mongo');
    } catch (error) {
        console.error('Error connecting to mongo:', error);
        process.exit(1); // Exit if unable to connect to DB
    }

    // APP METHODS
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true })); // middleware function in Express.js that parses incoming requests with URL-encoded payloads. This is to handle form submissions
    app.set("view engine", "ejs"); // Template engine to generate HTML dynamically using templates

    app.post('/upload_files', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Uploaded file:', req.file);

            const fileBuffer = req.file?.buffer; // Access the buffer
            const displayName = req.body.displayName;
            const folder = 'media-safe';

            if (!fileBuffer) {
                res.status(400).json({ error: 'No file uploaded.' }); // Handle case where no file is uploaded
                return;
            }

            const result = await uploadToCloudinary(fileBuffer, folder, displayName); // Call the upload function
            res.json(result); //Return the result to the frontend

            await Media.create({
                title: result.display_name,
                cloudinaryLink: result.url,
                assetId: result.asset_id
            });

            console.log('Media saved to DB');
        } catch (error) {
            console.error("Error uploading file:", (error as Error).message);
            res.status(500).json({ error: (error as Error).message }) //Handle any errors
        }
    });

    app.listen(PORT, () => {
        console.log(`RUNNING ON PORT ${PORT}`);
    });
}

startServer()