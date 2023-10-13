const db = require('../models')
const FoodCalendar = db.foodcalendar
const Op = db.Sequelize.Op

module.exports.findAll = (req, res) => {
    FoodCalendar.findAll({
        include: [{
            association: 'CalendarItems',
            required: false,
        }],
        order: [['add_date', 'DESC']]
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
}
module.exports.create = (req, res) => {
    if (!req.body.add_date) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const foodcalendar = {
        add_date: req.body.add_date,
        CalendarItems: [{
            name: "AAAnanas UUSI, kuorittu",
            piece: 1,
            gram: 0,
            kj: 232.7,
            kcal: 55.62,
            fat: 0.4,
            carbohydrate: 11.2,
            protein: 0.5,
        }]
    };

    FoodCalendar.create(foodcalendar)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Failed to create foodcalendar" });
        });

}
