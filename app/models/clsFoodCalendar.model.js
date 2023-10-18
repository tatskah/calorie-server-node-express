const { DataTypes, Model, Deferrable } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

    class FoodCalendar extends Model { }

    FoodCalendar.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        add_date: {
            type: DataTypes.DATE

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
        modelName: 'FoodCalendar',
        tableName: 'food_calendar',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    //,{foreignKey: 'foodcalendar_id', as: 'CalendarItems'}
    //FoodCalendar.CalendarItems = FoodCalendar.hasMany(sequelize.models.CalendarItems) 
    FoodCalendar.hasMany(sequelize.models.CalendarItems, { foreignKey: 'foodcalendar_id', allowNull: true, onDelete: 'CASCADE' });


    return FoodCalendar
}
