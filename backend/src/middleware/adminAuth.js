/**
 * Admin authentication middleware.
 * Checks for the X-Admin-Key header against the ADMIN_SECRET_KEY env variable.
 */
const adminAuth = (req, res, next) => {
  const key = req.headers["x-admin-key"];

  if (!key || key !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing admin key.",
    });
  }

  next();
};

module.exports = adminAuth;
