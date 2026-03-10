const { ObjectId } = require('mongodb');

class ChatModel {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    const cursor = this.collection.find();
    return await cursor.toArray();
  }

  async add(message) {
    // message should at least have { user, text, timestamp }
    return await this.collection.insertOne(message);
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = ChatModel;
