require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");
const adminAuth = require("./middleware/adminAuth");

// ── Route imports ─────────────────────────────────────────────────────────
const enquiryRoutes = require("./routes/enquiry");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");

const adminCategoriesRoutes = require("./routes/admin/categories");
const adminProductsRoutes = require("./routes/admin/products");
const adminOrdersRoutes = require("./routes/admin/orders");
const driveRoutes = require("./routes/driveRoutes");

// ── App setup ─────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SportzMitra API is running 🏆",
    version: "1.0.0",
    endpoints: {
      public: [
        "GET /api/categories",
        "GET /api/categories/:slug",
        "GET /api/products",
        "GET /api/products/:slug",
        "POST /api/enquiry",
      ],
      admin: [
        "GET    /api/admin/orders          (X-Admin-Key required)",
        "GET    /api/admin/orders/stats",
        "GET    /api/admin/orders/:id",
        "PATCH  /api/admin/orders/:id/status",
        "PATCH  /api/admin/orders/:id/notes",
        "DELETE /api/admin/orders/:id",
        "GET    /api/admin/categories",
        "GET    /api/admin/categories/flat",
        "POST   /api/admin/categories",
        "PUT    /api/admin/categories/:id",
        "DELETE /api/admin/categories/:id",
        "GET    /api/admin/products",
        "GET    /api/admin/products/:id",
        "POST   /api/admin/products",
        "PUT    /api/admin/products/:id",
        "DELETE /api/admin/products/:id",
      ],
    },
  });
});

// ── Public routes ─────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// ── Admin routes (protected by X-Admin-Key header) ─────────────────────────
app.use("/api/admin/categories", adminAuth, adminCategoriesRoutes);
app.use("/api/admin/products", adminAuth, adminProductsRoutes);
app.use("/api/admin/orders", adminAuth, adminOrdersRoutes);

// ── Drive OAuth routes (no auth needed — only admin uses these) ────────────
app.use("/api/drive", driveRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

// ── DB sync + server start ────────────────────────────────────────────────
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    // alter: true updates table schema without dropping data (safe for dev)
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    app.listen(PORT, () => {
      console.log(`🚀 SportzMitra API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
