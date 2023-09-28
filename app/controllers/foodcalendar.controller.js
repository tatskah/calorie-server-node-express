const db = require('../models')
const FoodCalendar = db.foodcalendar
const Op = db.Sequelize.Op

module.exports.findAll = (req, res) => {
    console.log('findAll')
    FoodCalendar.findAll({
        include: ['CalendarItems']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: err.message } || "Failed to get food calendar items");
        })


}

module.exports.findById = (req, res) => {


}