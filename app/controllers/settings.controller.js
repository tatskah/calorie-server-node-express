const db = require("../models");
const Settings = db.settings;
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if (!req.body.name) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

}

module.exports.findAll = (req, res) => {
    const name = req.query.name;
    let retData = {};
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Settings.findAll({ where: condition, order: ['name'], limit: 100 })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Error when getting fooditems." }); });
}

module.exports.update = (req, res) => {
    let updSuccesfully = true;
    const data = req.body;

    for (const key of Object.keys(data)) {
        updData = { value: data[key]['value'] };

        Settings.update(updData, {
            where: { name: { [Op.iLike]: `%${data[key]['name']}%` } }
        }).then(num => {
            if (num == 1) {
                //do nothing
            } else {
                updSuccesfully = true;
            }
        })
            .catch(err => {
                res.send(500).send({ message: err.message || `Something went wrong with id ${id}` });
            })
    }
    if (!updSuccesfully)
        res.send('Settings updated succesfully');
    else
        res.send('Settings update failed');

}