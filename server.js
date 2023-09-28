const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('connect').bodyParser());

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/fooditems.routes")(app);
require("./app/routes/foodcalendar.routes")(app);

const db = require("./app/models");
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