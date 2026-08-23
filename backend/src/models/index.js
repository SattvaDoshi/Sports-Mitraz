const sequelize = require("../config/db");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const Admin = require("./Admin");
const User = require("./User");

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
  onDelete: "CASCADE",
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
  as: "productDetails",
  foreignKey: "productId",
});

module.exports = { sequelize, Category, Product, Order, Admin, User };
