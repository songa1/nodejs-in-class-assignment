const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "secret";
const expiresIn = "1h";
const saltRounds = 10;

const generateHash = (pass) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

const comparePassword = (real, test) => {
  return bcrypt.compareSync(test, real);
};

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).json({ message: "Token unavailable" });
  } else {
    try {
      const decoded = jwt.verify(token, secret);
      return true;
    } catch (error) {
      res.status(401).json({ message: "Invalid token", error: error.message });
    }
  }
};

module.exports = { generateHash, comparePassword, generateToken, verifyToken };
