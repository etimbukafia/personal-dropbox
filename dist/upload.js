import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const base64Data = fileBuffer.toString('base64');
        const dataURI = `data:image/jpg;base64,${base64Data}`;
        cloudinary.uploader.upload(dataURI, { folder, resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(error);
            }
            resolve(result);
        });
    });
};
export default uploadToCloudinary;
//# sourceMappingURL=upload.js.map