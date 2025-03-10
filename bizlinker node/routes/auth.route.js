const express = require("express");
<<<<<<< HEAD
const { registerUser, verifyUser } = require("../controllers/register.auth.controller");
const { loginUser, refreshToken } = require("../controllers/login.auth.controller");
=======
const { registerUser, loginUser, refreshToken } = require("../controllers/auth.controller");
>>>>>>> 1c62170e4f8d3ed68182907be35c41edffa643bb

const router = express.Router();

router.post("/auth/register", registerUser);
<<<<<<< HEAD
router.post("/auth/verify", verifyUser);
=======
>>>>>>> 1c62170e4f8d3ed68182907be35c41edffa643bb
router.post("/auth/login", loginUser);
router.post("/auth/refresh-token", refreshToken);

module.exports = router;