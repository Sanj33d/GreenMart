const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');


const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// mongodb new DNS issue solution: 
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// dotenv
require("dotenv").config();

const uri = `${process.env.MONGODB_URI}`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    // integrating db and collections to mongodb
    // Database and Collection
    const database = client.db("greenmart");
    const productsCollection = database.collection("products");

    // all products
    app.get('/products', async (req, res) => {
        const cursor = productsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('GreenMart server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});