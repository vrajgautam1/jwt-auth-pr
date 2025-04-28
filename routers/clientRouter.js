const express = require('express');
const router = express.Router();
const clientController = require("../controllers/clientContoller");
const authMiddleware = require("../middlewares/authMiddleWare");

router.use(authMiddleware("user"));
router.get("/", clientController.openHomePage);

module.exports = router;