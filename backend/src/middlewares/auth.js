const jwt = require("jsonwebtoken");

function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token && !required) return next();
    if (!token) return res.status(401).json({ success: false, message: "Authentication required" });
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
}

module.exports = { auth, adminOnly };
