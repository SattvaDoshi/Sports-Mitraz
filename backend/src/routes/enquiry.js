const express = require("express");
const { body, validationResult } = require("express-validator");
const { Order } = require("../models");
const { appendEnquiryToSheet } = require("../services/googleSheets");

const router = express.Router();

/**
 * POST /api/enquiry
 * Public endpoint — receives the enquiry/quote form from the frontend.
 * Saves to DB and appends data to Google Sheets.
 */
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone is required")
      .matches(/^[0-9+\s\-()]{7,20}$/)
      .withMessage("Invalid phone number"),
    body("email").optional().trim().isEmail().withMessage("Invalid email"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, phone, email, product, message, productId } = req.body;

    try {
      // 1. Save order to DB
      const order = await Order.create({
        name,
        phone,
        email: email || null,
        product: product || null,
        message,
        productId: productId || null,
        status: "pending",
        sheetSynced: false,
      });

      // 2. Append to Google Sheets (non-blocking — errors are swallowed)
      let sheetResult = null;
      try {
        sheetResult = await appendEnquiryToSheet({
          name,
          mobile: phone,
          email: email || "N/A",
          requirement: product || "General Enquiry",
          message,
        });
      } catch (err) {
        console.error("Failed to append to sheet", err);
      }

      // 3. Update sheetSynced flag if sync succeeded
      if (sheetResult) {
        await order.update({ sheetSynced: true });
      }

      return res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully! We'll get back to you shortly.",
        orderId: order.id,
      });
    } catch (error) {
      console.error("Enquiry route error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to submit enquiry. Please try again.",
      });
    }
  }
);

module.exports = router;
