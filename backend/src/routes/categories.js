const express = require("express");
const { Category, Product } = require("../models");

const router = express.Router();

/**
 * GET /api/categories
 * Returns all top-level categories with their direct subcategories.
 */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parentId: null, isActive: true },
      include: [
        {
          model: Category,
          as: "subcategories",
          where: { isActive: true },
          required: false,
          order: [["sortOrder", "ASC"]],
        },
      ],
      order: [["sortOrder", "ASC"]],
    });

    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/categories/:slug
 * Returns a single category (by slug) with its subcategories and products.
 */
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [
        {
          model: Category,
          as: "subcategories",
          where: { isActive: true },
          required: false,
          order: [["sortOrder", "ASC"]],
          include: [
            {
              model: Product,
              as: "products",
              where: { isActive: true },
              required: false,
              order: [["sortOrder", "ASC"]],
            },
          ],
        },
        {
          model: Product,
          as: "products",
          where: { isActive: true },
          required: false,
          order: [["sortOrder", "ASC"]],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.json({ success: true, data: category });
  } catch (error) {
    console.error("GET /api/categories/:slug error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
