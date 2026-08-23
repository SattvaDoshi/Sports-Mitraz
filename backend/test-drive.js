require('dotenv').config();
const { google } = require('googleapis');
const { getAuthenticatedClient } = require('./src/config/googleDrive');

async function test() {
  try {
    const auth = getAuthenticatedClient();
    const drive = google.drive({ version: 'v3', auth });
    
    // Create a small test file
    const { Readable } = require('stream');
    const stream = Readable.from(['hello from sportzmitra!']);
    
    const file = await drive.files.create({
      resource: {
        name: 'test-upload.txt',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: 'text/plain',
        body: stream,
      },
      fields: 'id, webViewLink',
    });
    
    console.log('✅ Drive upload SUCCESS!');
    console.log('File ID:', file.data.id);
    console.log('View Link:', file.data.webViewLink);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}
test();
