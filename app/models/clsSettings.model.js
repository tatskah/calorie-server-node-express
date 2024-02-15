const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Settings extends Model {}

  Settings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Date.NOW,
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Date.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Settings",
      timestamps: true,
      tableName: "settings",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Settings;
};
