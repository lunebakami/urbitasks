const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const authConfig = require("../../config/auth");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    req.enterprise = decoded.enterprise;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = auth;