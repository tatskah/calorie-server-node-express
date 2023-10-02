const db = require('../models')
const FoodCalendar = db.foodcalendar
const Op = db.Sequelize.Op

module.exports.findAll = (req, res) => {
    FoodCalendar.findAll({
        include: [{
            association: 'CalendarItems',
            required: false,
        }]
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
    const id = req.params.id;
    FoodCalendar.findByPk(id, {
        include: [{
            association: 'CalendarItems',
            required: false,
        }]
    })
        .then(data => {
            res.send(data);
        }).catch(err => {
            req.status(500).send({ message: err.message } || `Failed to get foodcalendar with id: ${id}`);
        });

    module.exports.createFoodCalendar = (req, res) => {



    }
}