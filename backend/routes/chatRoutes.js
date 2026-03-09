const express = require('express');

module.exports = function(chatCollection) {
  const router = express.Router();
  const ChatModel = require('../models/chatModel');
  const ChatController = require('../controllers/chatController');

  const model = new ChatModel(chatCollection);
  const controller = new ChatController(model);

  // GET /chat - list all messages
  router.get('/', controller.getMessages);

  // POST /chat - add a new message
  router.post('/', controller.postMessage);

  // DELETE /chat/:id - remove a message
  router.delete('/:id', controller.deleteMessage);

  return router;
};
