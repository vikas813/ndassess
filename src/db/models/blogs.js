const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "blogs",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      writer: {
        defaultValue: "writer",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      content: {
        defaultValue: "content",
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
      description: {
        defaultValue: "description",
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
    },
    { timestamps: false }
  );
};