const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('connect').bodyParser());

var corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5173']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(function(req,res,next) {
    console.log("Time: %d", Date.now());
    next();
});

require("./app/routes/fooditems.routes")(app);
require("./app/routes/foodcalendar.routes")(app);

const db = require("./app/models");
const { TIME } = require('sequelize');
db.sequelize
    //.sync()
    .authenticate()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to calorie node server" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Calorie server running at port ${PORT}`);
});