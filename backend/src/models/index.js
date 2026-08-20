const sequelize = require("../config/db");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");

// ── Category self-referential (parent → children) ──────────────────────────
Category.hasMany(Category, {
  as: "subcategories",
  foreignKey: "parentId",
  onDelete: "SET NULL",
});
Category.belongsTo(Category, {
  as: "parent",
  foreignKey: "parentId",
});

// ── Category → Products ───────────────────────────────────────────────────
Category.hasMany(Product, {
  as: "products",
  foreignKey: "categoryId",
});
Product.belongsTo(Category, {
  as: "category",
  foreignKey: "categoryId",
});

// ── Order → Product (optional) ────────────────────────────────────────────
Product.hasMany(Order, {
  as: "orders",
  foreignKey: "productId",
});
Order.belongsTo(Product, {
  as: "product",
  foreignKey: "productId",
});

module.exports = { sequelize, Category, Product, Order };
