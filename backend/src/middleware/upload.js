const multer = require("multer");
const streamifier = require("streamifier");
const { google } = require("googleapis");
const { getAuthenticatedClient } = require("../config/googleDrive");

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
 * Upload a single buffer to Google Drive using OAuth2.
 * @param {Buffer} buffer   - File buffer from multer memory storage
 * @param {string} filename - Name of the file
 * @param {string} mimeType - Mime type of the file
 * @returns {Promise<object>} Google Drive upload result with webViewLink
 */
const uploadToDrive = async (buffer, filename, mimeType) => {
  const auth = getAuthenticatedClient();
  const drive = google.drive({ version: "v3", auth });
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID is not configured in .env");
  }

  const fileMetadata = {
    name: filename,
    parents: [folderId],
  };

  const media = {
    mimeType,
    body: streamifier.createReadStream(buffer),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink, webContentLink",
    });

    // Make the file publicly viewable (anyone with link)
    try {
      await drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    } catch (permError) {
      console.warn(
        "⚠️ Could not set public permission on file:",
        permError.message
      );
    }

    // Use Drive's thumbnail API — works publicly in any browser without sign-in
    file.data.directLink = `https://drive.google.com/thumbnail?id=${file.data.id}&sz=w800`;

    console.log(`✅ Uploaded to Drive: ${file.data.id}`);
    return file.data;
  } catch (error) {
    console.error("❌ Drive upload error:", error.message);
    throw error;
  }
};

/**
 * Upload multiple buffers to Google Drive in parallel.
 * @param {Express.Multer.File[]} files
 * @returns {Promise<string[]>} Array of webViewLinks
 */
const uploadManyToDrive = async (files) => {
  const results = await Promise.all(
    files.map((f) => uploadToDrive(f.buffer, f.originalname, f.mimetype))
  );
  return results.map((r) => r.directLink);
};

module.exports = { upload, uploadToDrive, uploadManyToDrive };
