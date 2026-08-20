const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Customer details from enquiry form
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    // What they need (free text or product/category name)
    product: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Optional FK to a specific product if selected
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Products", key: "id" },
      onDelete: "SET NULL",
    },
    // Admin-managed status
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "booked", "cancelled"),
      defaultValue: "pending",
    },
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Track whether WhatsApp notification was sent
    whatsappSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

module.exports = Order;
