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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: 401, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ status: 403, message: "Invalid token" });
  }
};

module.exports = { generateHash, comparePassword, generateToken, verifyToken };
