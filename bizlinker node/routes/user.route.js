const express = require("express");
const router = express.Router();

const {getAllUsers, createUser, getUserByEmail, updateUser, deleteUser, addBusinessPortfolio, addFeedback} = require("../controllers/user.controller");

// Users Controller
router.get("/users",getAllUsers);
router.get("/users/email/:email",getUserByEmail);
router.post("/users",createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser); 
router.put("/users/businessPortfolio/:userId", addBusinessPortfolio);
router.put("/users/feedback/:userId", addFeedback);

module.exports = router;