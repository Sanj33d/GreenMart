const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("greenmart");
    console.log("MongoDB connectedddddd");
  }
  return db;
}

module.exports = connectDB;