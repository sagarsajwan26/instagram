import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
  cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET
    });


export const uploadToCloudinary = async (fileBuffer, originalname) => {
    if (!fileBuffer) throw new Error("file is required");
    try {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto', public_id: `${Date.now()}-${originalname}` },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(fileBuffer);
        });
    } catch (error) {
        throw new Error(error.message);      
    }
};
