const express = require("express");
const { registerUser, verifyUser } = require("../controllers/register.auth.controller");
const { loginUser, refreshToken } = require("../controllers/login.auth.controller");

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/verify", verifyUser);
router.post("/auth/login", loginUser);
router.post("/auth/refresh-token", refreshToken);

module.exports = router;