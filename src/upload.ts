import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import { Stream } from 'stream';
import multer from 'multer';

dotenv.config;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// Cloudinary upload constant
const uploadToCloudinary = (fileStream: Readable): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error); //reject the promise if there's an error
            }
            resolve(result); //Resolve the promise with a result
        });

        // Pipe the filestream to cloudinary
        fileStream.pipe(uploadStream);
    });
};