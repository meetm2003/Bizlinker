const express = require("express");
const { registerUser, loginUser, refreshToken } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/refresh-token", refreshToken);

module.exports = router;