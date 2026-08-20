const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Categories", key: "id" },
      onDelete: "SET NULL",
    },
    images: {
      // JSON array of Cloudinary secure_urls
      type: DataTypes.JSON,
      defaultValue: [],
    },
    catalogPdfUrl: {
      // Cloudinary URL for product catalog PDF
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    tags: {
      // JSON array of tag strings e.g. ["Sublimation","Custom","Bulk"]
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "Products",
    timestamps: true,
  }
);

module.exports = Product;
