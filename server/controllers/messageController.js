const messageModel = require("../models/messageModel");

// createMessage
const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({ chatId, senderId, text });
    const response = await message.save();
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getMessage
const getMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messageModel.find({ chatId });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessage
};
