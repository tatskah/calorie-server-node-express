module.exports = (app) => {
    const router = require('express').Router();
    const foodcalendar = require('../controllers/foodcalendar.controller');

    router.get("/", foodcalendar.findAll);
    router.get('/:id', foodcalendar.findById);
    router.post('/', foodcalendar.create);

    app.use('/api/foodcalendar', router);

};