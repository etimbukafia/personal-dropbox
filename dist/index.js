import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import uploadToCloudinary from './upload.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const upload = multer({ storage: multer.memoryStorage() });
const connectionString = process.env.MONGO_URI;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
if (!connectionString) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose.connect(connectionString)
    .then(() => {
    app.listen(PORT, () => {
        console.log("Connected to mongo db atlas");
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDb Atlas:", error);
});
app.post('/upload_files', upload.single('file'), async (req, res) => {
    try {
        const fileStream = req.file?.stream;
        if (!fileStream) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }
        const result = await uploadToCloudinary(fileStream);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log('RUNNING ON PORT ${PORT}');
});
//# sourceMappingURL=index.js.map