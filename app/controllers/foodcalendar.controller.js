const db = require('../models');
const FoodCalendar = db.foodcalendar;
const CalendarItems = db.calendaritems;
const FoodItems = db.fooditems;
const Op = db.Sequelize.Op;

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
            res.status(500).send({ message: err.message } || `Failed to get foodcalendar with id: ${id}`);
        });
}
module.exports.create = async (req, res) => {

    // CalendarItems.belongsTo(db.sequelize.models.FoodCalendar)

    if (!req.body.add_date) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const { add_date, name, piece, gram, kj, kcal, carbohydrate, protein, fat } = req.body;
    const fooditem_ids = req.body.fooditem_ids.split(",").map(Number);
    const grams = req.body.grams.split(",").map(Number);
    const pieces = req.body.pieces.split(",").map(Number);

    const result = await db.sequelize.query('SELECT MAX(id)+1 AS id FROM food_calendar', { raw: true, type: db.Sequelize.QueryTypes.SELECT })
    const maxID = result[0].id;
    const calendarItemsArr = [];

    for (const [idx, id] of fooditem_ids.entries()) {
        const row = await db.sequelize.query('SELECT * FROM food_items WHERE id = :id ', { replacements: { id }, raw: true, type: db.Sequelize.QueryTypes.SELECT })
        const item = {
            foodcalendar_id: maxID,
            name: row[0].name,
            piece: pieces[idx],
            gram: grams[idx],
            kj: row[0].kj,
            kcal: row[0].kcal,
            fat: row[0].fat,
            carbohydrate: row[0].carbohydrate,
            protein: row[0].protein,
        };
        calendarItemsArr.push(item);
    };


    const foodcalendar = {
        id: maxID,
        add_date: req.body.add_date,
        CalendarItems: [calendarItemsArr]
    };



    const new_foodcalendar = await FoodCalendar.create(foodcalendar)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Failed to create foodcalendar" });
        });

    for (element of calendarItemsArr) {
        const ret = await db.sequelize.query('SELECT MAX(id)+1 AS id FROM calendar_items', { raw: true, type: db.Sequelize.QueryTypes.SELECT })
        const maxIDItem = ret[0].id;
        console.log(maxIDItem);
        element.id = maxIDItem;
        const cal_items = new CalendarItems(element);
        await cal_items.save();
    };
}
