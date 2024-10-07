const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    res.status(403).json({
      message: "No valid tokan",
    });
  }

  const token = authHead.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userID = decoded.userID;
    req.userfname = decoded.userfname;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
}

module.exports = {
  authMiddleware,
};
