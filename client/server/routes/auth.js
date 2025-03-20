const express = require('express');
const { Login, Register } = require('../controllers/auth');

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

module.exports = router;