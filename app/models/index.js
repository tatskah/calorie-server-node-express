const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorAliases : dbConfig.operatorAliases,
    logging: console.log,
    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
const Op = db.Sequelize.Op

//db.fooditems = require("./fooditems.model")(sequelize, Sequelize);
db.fooditems = require("./clsFoodItems.model")(sequelize)
db.foodcalendar = require("./clsFoodCalendar.model")(sequelize)
db.calendaritems = require("./clsCalendarItems.model")(sequelize)



// const calendar =  db.foodcalendar.findAll();
// console.log(calendar);



module.exports = db;
