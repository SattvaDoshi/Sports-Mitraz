const express = require("express");
const { body, validationResult } = require("express-validator");
const { Order } = require("../models");
const { sendEnquiryToAdmin } = require("../services/whatsapp");

const router = express.Router();

/**
 * POST /api/enquiry
 * Public endpoint — receives the enquiry/quote form from the frontend.
 * Saves to DB and sends WhatsApp notification to admin.
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
        whatsappSent: false,
      });

      // 2. Send WhatsApp notification to admin (non-blocking — errors are swallowed)
      const waResult = await sendEnquiryToAdmin({
        name,
        phone,
        email: email || "N/A",
        product: product || "General Enquiry",
        message,
      });

      // 3. Update whatsappSent flag if notification succeeded
      if (waResult) {
        await order.update({ whatsappSent: true });
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
