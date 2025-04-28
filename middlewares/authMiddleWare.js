const jwt = require("jsonwebtoken");
const auth = (role) => {
  return async (req, res, next) => {
    // skip token check for login and register page
    // if (req.originalUrl === "/login" || req.originalUrl === "/register") {
    //   return next();
    // }

    // console.log(role);
    
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
    } catch (err) {
      console.log("Error verifying token");
      console.log(err.message);
      return res.redirect("/login");
    }

    if (role && decoded.role !== role && decoded.role !== "admin") {
      console.log("User cannot access this page");
      return res.redirect("/login");
    }

    next();
  };
};

module.exports = auth;