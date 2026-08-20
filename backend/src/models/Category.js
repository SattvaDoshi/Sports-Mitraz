const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      // Cloudinary URL
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    parentId: {
      // null = top-level category; number = subcategory
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Categories", key: "id" },
      onDelete: "SET NULL",
    },
    isLeaf: {
      // true = this subcategory IS a product (no further children expected)
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

// Self-referential association (set up in models/index.js)

module.exports = Category;
