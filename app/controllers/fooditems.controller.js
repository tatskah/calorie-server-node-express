const db = require("../models");
const FoodItems = db.fooditems;
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if (!req.body.name) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const fooditem = {
        name: req.body.name,
        kj: req.body.kj,
        kcal: req.body.kcal,
        fat: req.body.fat,
        carbohydrate: req.body.carbohydrate,
        protein: req.body.protein,
        favorite: req.body.favorite
    };

    FoodItems.create(fooditem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error on create the fooditem."
            });
        });
};

module.exports.findAll = (req, res) => {
    const name = req.query.name;

    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    FoodItems.findAll({ where: condition, order: [[db.Sequelize.literal('favorite DESC')],['name']], limit: 100 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: err.message || "Error when getting fooditems." });
        });


}

exports.findById = (req, res) => {
    const id = req.params.id;

    FoodItems.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res
                .send({ message: `Did not find food item with id ${id}` });
            }
        })
        .catch(err => {
            res.status(500)
                .send({ message: err.message || `Error when getting fooditem with id ${id}` });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    FoodItems.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fooditem was updated successfully"
                });
            } else {
                res.send({
                    message: `Fooditem update with id ${id} FAILED`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `ERROR in fooditem update with id ${id}`
            })
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    FoodItems.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fooditem was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete fooditem with id=${id}. Maybe it not exists!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete fooditem with id=" + id
            });
        });
}

exports.deleteAll = (req, res) => {

};
