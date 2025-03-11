const express = require("express");
const { sendMessage, markAsSeen, getMessages } = require("../controllers/message.controller");
const router = express.Router();

router.post("/message/send", sendMessage);
router.get("/message/:user1/:user2", getMessages);
router.put("/message/seen/:messageId", markAsSeen);

module.exports = router;