const express = require("express");
const { Product, Category } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

/**
 * GET /api/products
 * Returns all active products.
 * Optional query: ?category=<categorySlug> & search=<searchQuery>
 */
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    // If ?category= is provided, find the category first to get its ID
    let categoryFilter = {};
    if (category) {
      const cat = await Category.findOne({ where: { slug: category, isActive: true } });
      if (!cat) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      categoryFilter = { categoryId: cat.id };
    }

    let searchFilter = {};
    let order = [["sortOrder", "ASC"]];

    if (search) {
      searchFilter = {
        name: {
          [Op.like]: `%${search}%`
        }
      };
      // Sort by rating descending when searching
      order = [["averageRating", "DESC"]];
    }

    const products = await Product.findAll({
      where: { isActive: true, ...categoryFilter, ...searchFilter },
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
      order: order,
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

/**
 * POST /api/products/:id/rate
 * Submits a star rating for a product (1 to 5).
 */
router.post("/:id/rate", async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating === undefined || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Calculate new average
    const currentTotal = product.totalRatings || 0;
    const currentAvg = parseFloat(product.averageRating) || 0;

    const newTotal = currentTotal + 1;
    const newAvg = ((currentAvg * currentTotal) + Number(rating)) / newTotal;

    product.totalRatings = newTotal;
    product.averageRating = newAvg.toFixed(2);
    
    await product.save();

    return res.json({ success: true, message: "Rating submitted successfully", data: product });
  } catch (error) {
    console.error("POST /api/products/:id/rate error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
