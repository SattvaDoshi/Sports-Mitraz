const express = require("express");
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");
const { Product, Category } = require("../../models");
const { upload, uploadToDrive, uploadManyToDrive } = require("../../middleware/upload");

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/admin/products
// List all products (optionally filter by ?categoryId=)
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);

    const products = await Product.findAll({
      where,
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
      order: [["sortOrder", "ASC"]],
    });

    return res.json({ success: true, data: products });
  } catch (error) {
    console.error("Admin GET /products error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/products/:id
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    console.error("Admin GET /products/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// POST /api/admin/products
// Create a product. Accepts up to 10 images + 1 optional PDF.
// Multipart fields: images[] (multiple), catalogPdf (single)
// ─────────────────────────────────────────────
const productUpload = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "catalogPdf", maxCount: 1 },
]);

router.post(
  "/",
  productUpload,
  [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("categoryId").notEmpty().isInt().withMessage("Valid categoryId is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description, startingPrice, priceType, sizes, categoryId, tags, isActive, sortOrder } = req.body;

      // Validate category exists
      const category = await Category.findByPk(parseInt(categoryId));
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }

      // Generate slug
      let slug = slugify(name, { lower: true, strict: true });
      const existing = await Product.findOne({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;

      // Upload product images
      let imageUrls = [];
      if (req.files && req.files["images"]) {
        imageUrls = await uploadManyToDrive(req.files["images"]);
      }

      // Upload catalog PDF
      let catalogPdfUrl = null;
      if (req.files && req.files["catalogPdf"] && req.files["catalogPdf"][0]) {
        const pdfResult = await uploadToDrive(
          req.files["catalogPdf"][0].buffer,
          req.files["catalogPdf"][0].originalname,
          req.files["catalogPdf"][0].mimetype
        );
        catalogPdfUrl = pdfResult.webViewLink || pdfResult.webContentLink;
      }

      // Parse tags (can be comma-separated string or JSON array)
      let parsedTags = [];
      if (tags) {
        try {
          parsedTags = JSON.parse(tags);
        } catch {
          parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
        }
      }

      // Parse sizes (can be comma-separated string or JSON array)
      let parsedSizes = [];
      if (sizes) {
        try {
          parsedSizes = JSON.parse(sizes);
        } catch {
          parsedSizes = sizes.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }

      const product = await Product.create({
        name,
        slug,
        description: description || null,
        startingPrice: startingPrice ? parseFloat(startingPrice) : null,
        priceType: priceType || "starting",
        sizes: parsedSizes,
        categoryId: parseInt(categoryId),
        images: imageUrls,
        catalogPdfUrl,
        tags: parsedTags,
        isActive: isActive !== "false",
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      });

      return res.status(201).json({ success: true, data: product });
    } catch (error) {
      console.error("Admin POST /products error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ─────────────────────────────────────────────
// PUT /api/admin/products/:id
// Update a product. New images are APPENDED to existing array
// unless ?replaceImages=true is passed.
// ─────────────────────────────────────────────
router.put("/:id", productUpload, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const {
      name,
      description,
      startingPrice,
      priceType,
      sizes,
      categoryId,
      tags,
      isActive,
      sortOrder,
      replaceImages,
      removeImageUrls,    // JSON array of URLs to remove from existing
    } = req.body;

    // Handle images
    let imageUrls = [...(product.images || [])];

    // Remove specific images if requested
    if (removeImageUrls) {
      const toRemove = JSON.parse(removeImageUrls);
      imageUrls = imageUrls.filter((url) => !toRemove.includes(url));
    }

    if (req.files && req.files["images"] && req.files["images"].length > 0) {
      const newUrls = await uploadManyToDrive(req.files["images"]);
      if (replaceImages === "true") {
        imageUrls = newUrls;
      } else {
        imageUrls = [...imageUrls, ...newUrls];
      }
    }

    // Handle catalog PDF
    let catalogPdfUrl = product.catalogPdfUrl;
    if (req.files && req.files["catalogPdf"] && req.files["catalogPdf"][0]) {
      const pdfResult = await uploadToDrive(
        req.files["catalogPdf"][0].buffer,
        req.files["catalogPdf"][0].originalname,
        req.files["catalogPdf"][0].mimetype
      );
      product.catalogPdfUrl = pdfResult.webViewLink || pdfResult.webContentLink;
    }

    // Slug update
    let slug = product.slug;
    if (name && name !== product.name) {
      slug = slugify(name, { lower: true, strict: true });
      const existing = await Product.findOne({ where: { slug } });
      if (existing && existing.id !== product.id) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Parse tags
    let parsedTags = product.tags;
    if (tags !== undefined) {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }
    
    // Parse sizes
    let parsedSizes = product.sizes;
    if (sizes !== undefined) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    await product.update({
      name: name || product.name,
      slug,
      description: description !== undefined ? description : product.description,
      startingPrice: startingPrice !== undefined ? parseFloat(startingPrice) : product.startingPrice,
      priceType: priceType !== undefined ? priceType : product.priceType,
      sizes: parsedSizes,
      categoryId: categoryId ? parseInt(categoryId) : product.categoryId,
      images: imageUrls,
      catalogPdfUrl,
      tags: parsedTags,
      isActive: isActive !== undefined ? isActive !== "false" : product.isActive,
      sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : product.sortOrder,
    });

    return res.json({ success: true, data: product });
  } catch (error) {
    console.error("Admin PUT /products/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/admin/products/:id
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.destroy();
    return res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Admin DELETE /products/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
