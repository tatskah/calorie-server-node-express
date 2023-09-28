module.exports = (app) => {
    const router = require("express").Router();
    const fooditems = require("../controllers/fooditems.controller");

    router.post("/", fooditems.create);

    router.get('/', fooditems.findAll);

    router.get("/:id", fooditems.findById);

    router.put("/:id", fooditems.update);

    router.delete("/:id", fooditems.delete);
    
    app.use('/api/fooditems', router);
}