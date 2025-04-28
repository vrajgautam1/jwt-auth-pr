const express = require('express');
const router = express.Router();
const adminRouter = require('./adminRouter');
const loginRouter = require('./loginRouter');
const clientRouter = require('./clientRouter');

router.use(loginRouter);
router.use(clientRouter);
router.use(adminRouter);

module.exports = router;