const express = require("express");
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const router = express.Router();
router.post("/register", UserController.addNewUser);

router.post("/login", AuthController.login);
module.exports = router;
