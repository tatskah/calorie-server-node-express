module.exports = (app) => {
    const router = require('express').Router();
    const foodcalendar = require('../controllers/foodcalendar.controller');

    router.get("/", foodcalendar.findAll);
    router.get('/:id', foodcalendar.findById);
    router.post('/', foodcalendar.create);
    router.delete('/:id', foodcalendar.delete);
    router.delete('/item/:id', foodcalendar.deleteItem);

    app.use('/api/foodcalendar', router);

};