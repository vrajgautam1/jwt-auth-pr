const User = require("../models/userModel");
const bcrypt = require("bcrypt"); 
const { request } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.openLoginPage = (req, res) => {
    return res.render("./login/login.ejs");
}

module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    try {
        //-1 check if the user exists in the database
        const user = await User.findOne({email:email});
        
        if(!user){
            req.flash("error", "User does not exist")
            cosnole.log("User does not exist");
            return res.redirect("/login")
        }

        //-2 check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            req.flash("error", "Incorrect password")
            console.log("Incorrect password")
            return res.redirect("/login")
        }

        //-now lets jwt this bitch. 
        //-1 generate a token
        const token = jwt.sign(
            {user: user.username, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        //-2 save token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            maxAge: 1000*60*60*24
        })

        if(user.role === "admin"){
            req.flash("success", "admin logged in successfully")
            return res.redirect("/dashboard");
        }

        if(user.role === "user"){
            return res.redirect("/")
        }
       
    } catch (error) {
        console.log("Error logging in user");
        console.log(error.message)
        return res.redirect("/login")
    }
}

module.exports.openRegistrationPage = async(req, res) => {
    // const error = req.flash("error") // no need for this line once we make the flash messages global
    return res.render("./login/register.ejs");
}

module.exports.register = async(req, res) => {
    const { username, email, password } = req.body;
    try {

        // Check if the user already exists, also make sure the user does not create multiple accounts with the same email or username
        const userExists = await User.findOne({$or: [{username:username}, {email:email}]});
        
        if(userExists){
            console.log("User already exists");
            const error = req.flash("error", "User already exists")
            return res.redirect("/register")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        })
        console.log("User created successfully")
        return res.redirect("/login")
    } catch (error) {
        console.log("Error creating user")
        console.log(error.message)
        return res.redirect("/register")
    }
}

