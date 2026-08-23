const { getGoogleAuth, google } = require('../config/googleApi');

/**
 * Appends a row of enquiry data to a Google Sheet.
 * @param {object} data - The enquiry data to append
 * @returns {Promise<object>} - Google Sheets API response
 */
const appendEnquiryToSheet = async (data) => {
  const auth = getGoogleAuth();
  if (!auth) {
    throw new Error("Google API credentials are not configured.");
  }

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured in .env");
  }

  // Format date to be human-readable (e.g., '23 Aug 2026, 1:16 pm')
  const dateStr = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  });

  // Define the row data: [Date, Name, Mobile, Email, Requirement, Message, ImageURL]
  const rowData = [
    dateStr,
    data.name || "",
    data.mobile || "",
    data.email || "",
    data.requirement || "",
    data.message || "",
    data.imageUrl || ""
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G', // Adjust range if your sheet name is different
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log("✅ Data appended to Google Sheet");
    return response.data;
  } catch (error) {
    console.error("❌ Google Sheets append error:", error);
    throw error;
  }
};

module.exports = {
  appendEnquiryToSheet,
};
