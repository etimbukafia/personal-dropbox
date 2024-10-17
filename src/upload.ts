import { v2 as cloudinary, UploadStream } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Cloudinary upload constant
const uploadToCloudinary = (fileBuffer: Buffer, folder: string, displayName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const base64Data = fileBuffer.toString('base64');
        const dataURI = `data:image/avif;base64,${base64Data}`; // Change the MIME type based on your file type

        cloudinary.uploader.upload(
            dataURI,
            { folder, public_id: displayName, resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error); //reject the promise if there's an error
                }
                resolve(result); //Resolve the promise with a result
            }
        );
    });
};

export default uploadToCloudinary;