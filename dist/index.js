import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import uploadToCloudinary from './upload.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const upload = multer({ storage: multer.memoryStorage() });
const connectionString = process.env.MONGO_URI;
async function startServer() {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.post('/upload_files', upload.single('file'), async (req, res) => {
        try {
            console.log('Uploaded file:', req.file);
            const fileBuffer = req.file?.buffer;
            if (!fileBuffer) {
                res.status(400).json({ error: 'No file uploaded.' });
                return;
            }
            const folder = 'media-safe';
            const result = await uploadToCloudinary(fileBuffer, folder);
            res.json(result);
        }
        catch (error) {
            console.error("Error uploading file:", error.message);
            res.status(500).json({ error: error.message });
        }
    });
    app.listen(PORT, () => {
        console.log(`RUNNING ON PORT ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map