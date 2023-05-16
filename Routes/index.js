const express = require("express");
const UserRoutes = require("./users");
const AuthRoutes = require("./auth");
const { verifyToken } = require("../Middleware/auth");

const Routes = express.Router();

Routes.use("/users", UserRoutes);
Routes.use("/auth", AuthRoutes);

module.exports = Routes;
