// controllers/upload.controller.js
const cloudinary = require("../utils/cloudinaryConfig");

const uploadToCloudinary = async (fileBuffer, folder) => {
    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(fileBuffer);
    });
};

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded!' });
        }

        const result = await uploadToCloudinary(req.file.buffer, 'uploads');

        res.status(200).json({
            message: 'File uploaded successfully!',
            url: result.secure_url
        });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed', details: error.message });
    }
};

module.exports = { uploadFile };