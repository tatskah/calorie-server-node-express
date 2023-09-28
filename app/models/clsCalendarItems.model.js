const { DataTypes, Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    class CalendarItems extends Model { }

    CalendarItems.init({

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FoodCalendarId: {
            type: DataTypes.INTEGER,
            field: 'foodcalendar_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piece: {
            type: DataTypes.DOUBLE,
        },
        gram: {
            type: DataTypes.DOUBLE,
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
        modelName: 'CalendarItems',
        timestamps: true,
        tableName: 'calendar_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return CalendarItems
}
// kj;
// kcal;
// fat;
// carbohydrate;
// protein;
// updatedAt;

