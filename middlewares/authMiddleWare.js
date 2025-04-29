const jwt = require("jsonwebtoken");
const auth = (role) => {
  return async (req, res, next) => {
    //basically this middleware deals with all scenarios where access is denied to the user.

    //-1 fetch the token from cookies. if there is no token then redirect to login page
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }
    
    //-2 now lets say the browser has a token. now check if the token is valid. 
    //-2.0.1 we store the token status in a variable called decoded.
    //-2.1 to do that we must use jwt.verify method. where the first parameter is the token and the second parameter is the secret key. 
    //-2.2 now jwt.verfiy will throw an error if the token is invalid. so we must handle that error. using try and catch block. basically this will crash the server if we do not handle the error.
   
    let decoded

    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET); //this line will throw an error if the token is invalid. and then the execution will stop the server. so to handle that we must use try and catch block.
    }catch(err){
      console.log(err.message);
      return res.redirect("/login")
    }

    let isAuthorized;
    if(decoded.role === role || decoded.role === "admin"){
      isAuthorized = true;
    }

    if(!isAuthorized){
      console.log("User is not authorized to access this page");
      return res.redirect("/login")
    }

    next();
  };
};

module.exports = auth;