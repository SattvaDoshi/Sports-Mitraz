const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes needed to upload files to Drive
const SCOPES = ["https://www.googleapis.com/auth/drive"];

function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Force consent screen to always get a fresh refresh_token
  });
}

/**
 * Returns an authenticated oauth2Client.
 * If GOOGLE_DRIVE_REFRESH_TOKEN is set in .env, it uses that automatically.
 * Otherwise, you must go through the /api/drive/authorize flow first.
 */
function getAuthenticatedClient() {
  if (!process.env.GOOGLE_DRIVE_REFRESH_TOKEN) {
    throw new Error(
      "GOOGLE_DRIVE_REFRESH_TOKEN is not set. Visit /api/drive/authorize to complete setup."
    );
  }

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

module.exports = {
  oauth2Client,
  getAuthUrl,
  getAuthenticatedClient,
};
