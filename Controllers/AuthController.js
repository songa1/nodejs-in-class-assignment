const { comparePassword, generateToken } = require("../Middleware/auth");
const { getUserByEmail } = require("../Models/UserModel");

const AuthController = {
  login: (req, res) => {
    const { user_email, user_password } = req.body;

    const user = getUserByEmail(user_email, (err, user) => {
      if (err) {
        res.status(400).json({ message: "Error loggin in", error: err });
      }
      if (user) {
        console.log("User found:", user.user_password);
        const pass = comparePassword(user.user_password, user_password);
        if (pass) {
          const userData = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_phone: user.user_phone,
            created_at: user.created_at,
            updated_at: user.updated_at,
          };
          const token = generateToken(userData);
          res
            .status(200)
            .json({
              message: "Login successful",
              token: token,
              user: userData,
            });
        } else {
          res
            .status(400)
            .json({ message: "Login failed", error: "Wrong password" });
        }
      } else {
        console.log("User not found");
      }
    });

    console.log(user);
  },
};

module.exports = AuthController;
