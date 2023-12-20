const chatModel = require("../models/chatModel");

// create chat
// get user chats
// find chat

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      member: {
        $all: [firstId, secondId],
      },
    });
    if (chat) return res.status(200).send(chat);
    const newChat = new chatModel({
      member: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await chatModel.find({
      member: { $in: [userId] },
    });
    res.status(200).send(chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    console.log(findChat, secondId);
    const chats = await chatModel.find({
      member: { $all: [firstId, secondId] },
    });
    res.status(200).send(chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createChat, findUserChats, findChat };
