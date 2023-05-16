const express = require("express");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getOneUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
