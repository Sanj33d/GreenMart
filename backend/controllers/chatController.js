class ChatController {
  constructor(chatModel) {
    this.chatModel = chatModel;

    // bind methods to preserve `this` when used as route handlers
    this.getMessages = this.getMessages.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  async getMessages(req, res) {
    try {
      const messages = await this.chatModel.getAll();
      res.send(messages);
    } catch (err) {
      console.error('GET /chat error:', err);
      res.status(500).send({ error: 'Failed to load messages' });
    }
  }

  async postMessage(req, res) {
    try {
      const msg = req.body;
      if (!msg || !msg.text) {
        return res.status(400).send({ error: 'Message text is required' });
      }
      msg.timestamp = new Date();
      const result = await this.chatModel.add(msg);
      res.send(result);
    } catch (err) {
      console.error('POST /chat error:', err);
      res.status(500).send({ error: 'Failed to post message' });
    }
  }

  async deleteMessage(req, res) {
    try {
      const id = req.params.id;
      const result = await this.chatModel.delete(id);
      res.send(result);
    } catch (err) {
      console.error('DELETE /chat/:id error:', err);
      res.status(500).send({ error: 'Failed to delete message' });
    }
  }
}

module.exports = ChatController;
