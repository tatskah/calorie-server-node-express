const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const { info, error } = require("./app/utils/logger");
const config = require("./app/utils/config");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./app/utils/middleware");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('connect').bodyParser());

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8081",
    "http://localhost:51968",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(function (req, res, next) {
  info("Time: %d", Date.now());
  next();
});

//app.use([requestLogger, unknownEndpoint, errorHandler]);
app.use(requestLogger);

require("./app/routes/fooditems.routes")(app);
require("./app/routes/foodcalendar.routes")(app);
require("./app/routes/settings.routes")(app);

const db = require("./app/models");
const { TIME } = require("sequelize");
db.sequelize
  //.sync()
  .authenticate()
  .then(() => {
    info("Synced db.");
  })
  .catch((err) => {
    error("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// if (process.env.NODE_ENV === 'PRODUCTION') {
//     app.use(express.static('client/build'));
//     const path = require('path');
//     app.get('*', path.resolve(__dirname, 'client', 'build', 'index.html'))
// }

const PORT = config.PORT;
app.listen(PORT, () => {
  info(`Calorie server running at port ${PORT}`);
});

module.exports = app;
