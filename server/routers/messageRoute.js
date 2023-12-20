const express = require("express");
const {
  createMessage,
  getMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", createMessage).get("/:chatId", getMessage);

module.exports = router;
