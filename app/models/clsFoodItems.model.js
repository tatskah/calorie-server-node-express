const { DataTypes, Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    class FoodItems extends Model { }

    FoodItems.init({

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kj: {
            type: DataTypes.DOUBLE,
        },
        kcal: {
            type: DataTypes.DOUBLE,
        },
        fat: {
            type: DataTypes.DOUBLE,
        },
        carbohydrate: {
            type: DataTypes.DOUBLE,
        },
        protein: {
            type: DataTypes.DOUBLE,
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Date.NOW,
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Date.NOW,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'FoodItems',
        timestamps: true,
        tableName: 'food_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
    return FoodItems
}
// kj;
// kcal;
// fat;
// carbohydrate;
// protein;
// updatedAt;

