const nodemailer = require("nodemailer");

// Create a transporter using SMTP settings from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an OTP email to the user.
 * @param {string} to - The recipient email address.
 * @param {string} otp - The OTP to send.
 * @param {string} type - 'verification' | 'forgot_password'
 */
const sendOtpEmail = async (to, otp, type = "verification") => {
  const isVerification = type === "verification";
  
  const subject = isVerification 
    ? "Verify Your SportzMitra Account" 
    : "SportzMitra - Reset Your Password";
    
  const text = isVerification
    ? `Welcome to SportzMitra! Your verification OTP is: ${otp}. It will expire in 10 minutes.`
    : `You requested a password reset. Your OTP is: ${otp}. It will expire in 10 minutes.`;

  const html = isVerification
    ? `
      <h3>Welcome to SportzMitra!</h3>
      <p>Thank you for signing up.</p>
      <p>Your verification OTP is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes.</p>
    `
    : `
      <h3>Reset Your Password</h3>
      <p>You requested a password reset.</p>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>
    `;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"SportzMitra" <noreply@sportzmitra.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    
    // Preview only available when sending through an Ethereal account
    if (process.env.SMTP_HOST === "smtp.ethereal.email") {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email.");
  }
};

module.exports = {
  sendOtpEmail,
};
