const express= require("express");
const auth = require("../middleware/auth")
const router = express.Router();
const {login,signup} = require("../controller/user")
router.post('/login',login)
.post('/signup',signup)

module.exports = router;
