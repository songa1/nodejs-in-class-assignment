const express = require("express");
const Routes = require("../Routes");
const bodyParser = require("body-parser");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API made as a class demo.",
      version: "1.0",
    },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);

app.use("/api", Routes);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;
