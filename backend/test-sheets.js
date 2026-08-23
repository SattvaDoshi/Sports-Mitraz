require('dotenv').config();
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const authClient = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  SCOPES
);

const sheets = google.sheets({ version: 'v4', auth: authClient });
sheets.spreadsheets.values.append({
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  range: 'Sheet1!A:G',
  valueInputOption: 'USER_ENTERED',
  requestBody: { values: [['test', 'test']] }
}).then(res => console.log('Success:', res.status)).catch(err => console.error('Error:', err.message));
