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
    priceType: {
      type: DataTypes.ENUM("starting", "fixed"),
      defaultValue: "starting",
    },
    sizes: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Categories", key: "id" },
      onDelete: "CASCADE",
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
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    totalRatings: {
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
