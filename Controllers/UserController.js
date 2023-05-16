const { getAll, getUser, addUser, deleteUser } = require("../Models/UserModel");

const UserController = {
  getUsers: async (req, res) => {
    getAll()
      .then((users) => {
        res
          .status(200)
          .json({ message: "Can get a list of users", payload: users });
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving users",
          error: error.message,
        });
      });
  },

  getOneUser(req, res) {
    const userId = req.params.id;

    getUser(userId)
      .then((user) => {
        if (user) {
          res.status(200).json({ message: "User found", payload: user });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: "Error retrieving user", error: error.message });
      });
  },

  addNewUser: async (req, res) => {
    try {
      // Call the addUser method from the user model to add the user
      const result = await addUser(req.body);

      if (result) {
        // User added successfully
        res
          .status(201)
          .json({ message: "User added successfully!", payload: result });
      } else {
        // Failed to add user
        res.status(500).json({ error: "Failed to add a user!" });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser(req, res) {},

  deleteUser: async (req, res) => {
    const id = req.params.id;

    await deleteUser(id, (err, success) => {
      if (err) {
        res.status(400).json({ message: "Error deleting user", error: err });
      }
      if (success) {
        res.status(200).json({
          message: "Deleting successful",
          response: success,
        });
      } else {
        console.log("User not found");
      }
    });
  },
};

module.exports = UserController;
