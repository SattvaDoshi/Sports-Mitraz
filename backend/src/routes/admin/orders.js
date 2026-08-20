const express = require("express");
const { Op } = require("sequelize");
const { Order, Product } = require("../../models");

const router = express.Router();

const VALID_STATUSES = ["pending", "confirmed", "booked", "cancelled"];

// ─────────────────────────────────────────────
// GET /api/admin/orders
// List all orders with optional filters:
//   ?status=pending|confirmed|booked|cancelled
//   ?page=1&limit=20
//   ?search=<name or phone>
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;

    const where = {};

    if (status && VALID_STATUSES.includes(status)) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      include: [{ model: Product, as: "product", attributes: ["id", "name", "slug"] }],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset,
    });

    return res.json({
      success: true,
      data: orders,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Admin GET /orders error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/orders/stats
// Returns count per status (for dashboard)
// ─────────────────────────────────────────────
router.get("/stats", async (req, res) => {
  try {
    const stats = await Order.findAll({
      attributes: [
        "status",
        [require("sequelize").fn("COUNT", require("sequelize").col("id")), "count"],
      ],
      group: ["status"],
    });

    const result = { pending: 0, confirmed: 0, booked: 0, cancelled: 0 };
    stats.forEach((s) => {
      result[s.status] = parseInt(s.dataValues.count);
    });

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Admin GET /orders/stats error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/orders/:id
// Single order detail
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Product, as: "product", attributes: ["id", "name", "slug"] }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, data: order });
  } catch (error) {
    console.error("Admin GET /orders/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/admin/orders/:id/status
// Update order status. Body: { status, adminNotes? }
// ─────────────────────────────────────────────
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await order.update({
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
    });

    return res.json({
      success: true,
      message: `Order #${order.id} status updated to "${status}"`,
      data: order,
    });
  } catch (error) {
    console.error("Admin PATCH /orders/:id/status error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/admin/orders/:id/notes
// Update admin notes only
// ─────────────────────────────────────────────
router.patch("/:id/notes", async (req, res) => {
  try {
    const { adminNotes } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await order.update({ adminNotes });
    return res.json({ success: true, data: order });
  } catch (error) {
    console.error("Admin PATCH /orders/:id/notes error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/admin/orders/:id
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await order.destroy();
    return res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Admin DELETE /orders/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
