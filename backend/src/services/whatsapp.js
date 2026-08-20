const axios = require("axios");

/**
 * Sends a WhatsApp enquiry notification to the admin via RichAutomate.
 *
 * The RichAutomate template must have 5 variables in order:
 *   {{1}} name
 *   {{2}} phone
 *   {{3}} email
 *   {{4}} product/requirement
 *   {{5}} message
 *
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.phone
 * @param {string} params.email
 * @param {string} params.product   - Product/requirement string
 * @param {string} params.message
 * @returns {Promise<object>} RichAutomate API response
 */
const sendEnquiryToAdmin = async ({ name, phone, email, product, message }) => {
  try {
    const response = await axios.post(
      process.env.RICH_AUTOMATE_API_URL,
      {
        phone_number: process.env.WHATSAPP_ADMIN_NUMBER,
        template_name: process.env.WHATSAPP_TEMPLATE_NAME,
        variables: [name, phone, email || "N/A", product || "General", message],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RICH_AUTOMATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ WhatsApp sent to admin:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ WhatsApp send error:",
      error.response?.data || error.message
    );
    // Don't throw — we don't want a WhatsApp failure to break the order save
    return null;
  }
};

module.exports = { sendEnquiryToAdmin };
