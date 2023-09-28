

module.exports = (sequelize, Sequelize) => {
    const FoodItems = sequelize.define("food_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        kj: {
            type: Sequelize.DOUBLE
        },
        kcal: {
            type: Sequelize.DOUBLE
        },
        fat: {
            type: Sequelize.DOUBLE
        },
        carbohydrate: {
            type: Sequelize.DOUBLE
        },
        protein: {
            type: Sequelize.DOUBLE
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps :false
    });

    return FoodItems;
};