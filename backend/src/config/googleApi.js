const { google } = require('googleapis');

// Define scopes for both Drive and Sheets
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets'
];

let authClient = null;

const getGoogleAuth = () => {
  if (authClient) return authClient;

  // You can use a service account JSON file, or pass the credentials via env vars
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY 
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') // Handle line breaks in env var
      : null;

    if (clientEmail && privateKey) {
      authClient = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: SCOPES
      });
    } else {
      console.warn("⚠️ Google API credentials missing. Please configure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env");
    }
    
    return authClient;
  } catch (error) {
    console.error("Error initializing Google Auth Client:", error);
    return null;
  }
};

module.exports = {
  getGoogleAuth,
  google
};
