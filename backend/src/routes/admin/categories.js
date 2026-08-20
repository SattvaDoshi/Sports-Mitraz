const express = require("express");
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");
const { Category, Product } = require("../../models");
const { upload, uploadToCloudinary } = require("../../middleware/upload");

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/admin/categories
// List all categories (full tree with children)
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parentId: null },
      include: [
        {
          model: Category,
          as: "subcategories",
          include: [
            {
              model: Category,
              as: "subcategories", // support one more level deep
            },
          ],
        },
      ],
      order: [
        ["sortOrder", "ASC"],
        [{ model: Category, as: "subcategories" }, "sortOrder", "ASC"],
      ],
    });
    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Admin GET /categories error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/categories/flat
// Flat list of ALL categories (useful for dropdowns)
// ─────────────────────────────────────────────
router.get("/flat", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Category, as: "parent", attributes: ["id", "name"] }],
      order: [["sortOrder", "ASC"]],
    });
    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Admin GET /categories/flat error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// POST /api/admin/categories
// Create a new category or subcategory
// Body: { name, description?, parentId?, isLeaf?, sortOrder?, isActive? }
// File: image (optional)
// ─────────────────────────────────────────────
router.post(
  "/",
  upload.single("image"),
  [
    body("name").trim().notEmpty().withMessage("Category name is required"),
    body("parentId").optional().isInt().withMessage("parentId must be an integer"),
    body("isLeaf").optional().isBoolean(),
    body("sortOrder").optional().isInt(),
    body("isActive").optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description, parentId, isLeaf, sortOrder, isActive } = req.body;

      // Generate unique slug
      let slug = slugify(name, { lower: true, strict: true });
      const existing = await Category.findOne({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;

      // Upload image to Cloudinary if provided
      let imageUrl = null;
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "sportzmitra/categories");
        imageUrl = result.secure_url;
      }

      const category = await Category.create({
        name,
        slug,
        description: description || null,
        image: imageUrl,
        parentId: parentId ? parseInt(parentId) : null,
        isLeaf: isLeaf === "true" || isLeaf === true || false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        isActive: isActive !== undefined ? isActive !== "false" : true,
      });

      return res.status(201).json({ success: true, data: category });
    } catch (error) {
      console.error("Admin POST /categories error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ─────────────────────────────────────────────
// PUT /api/admin/categories/:id
// Update a category
// ─────────────────────────────────────────────
router.put(
  "/:id",
  upload.single("image"),
  [body("name").optional().trim().notEmpty()],
  async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }

      const { name, description, parentId, isLeaf, sortOrder, isActive } = req.body;

      let imageUrl = category.image;
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "sportzmitra/categories");
        imageUrl = result.secure_url;
      }

      let slug = category.slug;
      if (name && name !== category.name) {
        slug = slugify(name, { lower: true, strict: true });
        const existing = await Category.findOne({
          where: { slug },
        });
        if (existing && existing.id !== category.id) {
          slug = `${slug}-${Date.now()}`;
        }
      }

      await category.update({
        name: name || category.name,
        slug,
        description: description !== undefined ? description : category.description,
        image: imageUrl,
        parentId: parentId !== undefined ? (parentId ? parseInt(parentId) : null) : category.parentId,
        isLeaf: isLeaf !== undefined ? (isLeaf === "true" || isLeaf === true) : category.isLeaf,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : category.sortOrder,
        isActive: isActive !== undefined ? isActive !== "false" : category.isActive,
      });

      return res.json({ success: true, data: category });
    } catch (error) {
      console.error("Admin PUT /categories/:id error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ─────────────────────────────────────────────
// DELETE /api/admin/categories/:id
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Check for subcategories or products before deleting
    const childCount = await Category.count({ where: { parentId: category.id } });
    const productCount = await Product.count({ where: { categoryId: category.id } });

    if (childCount > 0 || productCount > 0) {
      return res.status(409).json({
        success: false,
        message: `Cannot delete: this category has ${childCount} subcategory/ies and ${productCount} product(s). Remove them first.`,
      });
    }

    await category.destroy();
    return res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Admin DELETE /categories/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
