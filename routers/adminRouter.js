const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController"); 
const authMiddleware = require("../middlewares/authMiddleWare");


router.use(authMiddleware("admin"))
router.get("/dashboard", adminController.openDashboardPage);

module.exports = router;