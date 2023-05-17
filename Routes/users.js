/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - user_name: string
 *         - user_email: string
 *         - user_phone: string
 *       properties:
 *         user_id:
 *           type: string
 *           description: The auto-generated id of the user
 *         user_name:
 *           type: string
 *           description: The title of the user
 *         user_email:
 *           type: string
 *           description: Email of the user
 *         user_phone:
 *           type: string
 *           description: phone number of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the user was created
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get one user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         user_id: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User is available
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: The user was not found
 *   patch:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        user_id: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/users'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         user_id: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

const express = require("express");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getOneUser);

router.patch("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
