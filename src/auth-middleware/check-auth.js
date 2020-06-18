const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) res.status(401), json({ message: "unauthorized" });
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "token is invalid" });
  }
}

module.exports = auth;
