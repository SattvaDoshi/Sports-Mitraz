const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

// Store file in memory — we stream it straight to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpg/png/webp/gif) and PDFs are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

/**
 * Upload a single buffer to Cloudinary.
 * @param {Buffer} buffer   - File buffer from multer memory storage
 * @param {string} folder   - Cloudinary folder name
 * @param {object} options  - Extra Cloudinary options
 * @returns {Promise<object>} Cloudinary upload result
 */
const uploadToCloudinary = (buffer, folder = "sportzmitra", options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", ...options },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Upload multiple buffers to Cloudinary in parallel.
 * @param {Express.Multer.File[]} files
 * @param {string} folder
 * @returns {Promise<string[]>} Array of secure_urls
 */
const uploadManyToCloudinary = async (files, folder = "sportzmitra") => {
  const results = await Promise.all(
    files.map((f) => uploadToCloudinary(f.buffer, folder))
  );
  return results.map((r) => r.secure_url);
};

module.exports = { upload, uploadToCloudinary, uploadManyToCloudinary };
