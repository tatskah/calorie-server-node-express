module.exports = (app) => {
    const router = require('express').Router();
    const settings = require('../controllers/settings.controller');

    router.get('/', settings.findAll)
    router.post('/', settings.update);

    app.use('/api/settings', router);
}
