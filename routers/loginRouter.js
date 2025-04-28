const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get("/register", loginController.openRegistrationPage);
router.post("/register", loginController.register)

router.get("/login", loginController.openLoginPage);
router.post("/login", loginController.login)

module.exports = router