const express = require("express");
const router = express.Router();

const {getAllUsers, createUser, getUserByEmail, updateUser, deleteUser, addBusinessPortfolio, addConnection, removeConnection, addFeedback, deleteDisproveUser} = require("../controllers/user.controller");

// Users Controller
router.get("/users",getAllUsers);
router.get("/users/email/:email",getUserByEmail);
router.post("/users",createUser);
router.put("/users/:id", updateUser);
router.delete("/users/delete/:id", deleteUser); 
router.put("/users/businessPortfolio/:userId", addBusinessPortfolio);
router.put("/users/feedback/:userId", addFeedback);
router.delete("/users/deleted", deleteDisproveUser);
router.put("/users/add-connections/:userId", addConnection);
router.put("/users/remove-connections/:userId", removeConnection);

module.exports = router;
