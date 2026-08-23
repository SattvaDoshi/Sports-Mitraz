const express = require("express");
const router = express.Router();

const { oauth2Client, getAuthUrl } = require("../config/googleDrive");

/**
 * GET /api/drive/authorize
 * Redirects the admin to Google's OAuth consent screen.
 */
router.get("/authorize", (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

/**
 * GET /api/drive/oauth2callback
 * Google redirects here after the user approves access.
 * Logs the refresh_token to the backend console — copy it into your .env
 */
router.get("/oauth2callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code missing");
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n====================================");
    console.log("✅ GOOGLE DRIVE TOKENS RECEIVED:");
    console.log("====================================");
    console.log("Refresh Token:", tokens.refresh_token);
    console.log("Access Token:", tokens.access_token);
    console.log("====================================\n");
    console.log("👉 Copy the Refresh Token above and add it to your .env as:");
    console.log("   GOOGLE_DRIVE_REFRESH_TOKEN=<paste here>\n");

    res.send(`
      <html>
        <body style="font-family: sans-serif; max-width: 600px; margin: 60px auto; text-align: center;">
          <h2>✅ Google Drive Authorization Successful</h2>
          <p>Check your backend terminal for the <strong>Refresh Token</strong>.</p>
          <p>Copy it and paste it into your <code>.env</code> file as:</p>
          <pre style="background:#f4f4f4;padding:12px;border-radius:6px;text-align:left;">GOOGLE_DRIVE_REFRESH_TOKEN=your_token_here</pre>
          <p>Then restart the backend server.</p>
          <p><a href="/">Go back to the app</a></p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send(`
      <h2>❌ Google OAuth Failed</h2>
      <pre>${error.message}</pre>
    `);
  }
});

module.exports = router;
