// IMPORTS
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import uploadToCloudinary from './upload.js';


dotenv.config()

// VARIABLES
const app: Express = express();
const PORT = process.env.PORT || 4000;
const upload = multer({ storage: multer.memoryStorage() });   // Use memory storage to handle the file in-memory
const connectionString = process.env.MONGO_URI;

// APP METHODS
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // middleware function in Express.js that parses incoming requests with URL-encoded payloads. This is to handle form submissions
app.set("view engine", "ejs"); // Template engine to generate HTML dynamically using templates


app.post('/upload_files', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
    try {
        const fileStream = req.file?.stream; //safely access the stream
        if (!fileStream) {
            res.status(400).json({ error: 'No file uploaded.' }); // Handle case where no file is uploaded
            return;
        }

        const result = await uploadToCloudinary(fileStream); // Call the upload function
        res.json(result); //Return the result to the frontend
    } catch (error) {
        res.status(500).json({ error: (error as Error).message }) //Handle any errors
    }
});

app.listen(PORT, () => {
    console.log('RUNNING ON PORT ${PORT}');
});