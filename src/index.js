const express = require("express");
const Routes = require("../Routes");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;
