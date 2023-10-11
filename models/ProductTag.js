const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

//I added the product and tag models variables to import the Product and Tag models
const Product = require("./Product");
const Tag = require("./Tag");

class ProductTag extends Model {}

ProductTag.init(
  // Define columns for ProductTag model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Product,
        key: "id",
      },
    },

    tag_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Tag,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
