const express = require("express");
const { Product, Category } = require("../models");

const router = express.Router();

/**
 * GET /api/products
 * Returns all active products.
 * Optional query: ?category=<categorySlug>
 */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    // If ?category= is provided, find the category first to get its ID
    let categoryFilter = {};
    if (category) {
      const cat = await Category.findOne({ where: { slug: category, isActive: true } });
      if (!cat) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      categoryFilter = { categoryId: cat.id };
    }

    const products = await Product.findAll({
      where: { isActive: true, ...categoryFilter },
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
      order: [["sortOrder", "ASC"]],
    });

    return res.json({ success: true, data: products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/products/:slug
 * Returns a single product by slug with its category.
 */
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    console.error("GET /api/products/:slug error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
