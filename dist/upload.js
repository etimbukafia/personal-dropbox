import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const uploadToCloudinary = (fileStream) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        fileStream.pipe(uploadStream);
    });
};
export default uploadToCloudinary;
//# sourceMappingURL=upload.js.map