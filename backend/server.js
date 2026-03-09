const express = require('express');
const app = express();
const port = process.env.PORT || 1272;

const cors = require('cors');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    // products collection
    const productsCollection = database.collection("products");
    // cart collection
    const cartCollection = database.collection("cart");
    // chat collection (new for chat system)
    const chatCollection = database.collection("chat");

    // endpoint1: /products
    app.get('/products', async (req, res) => {
        const cursor = productsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    // attach chat routes (MVC-style in separate files)
    const chatRoutes = require('./routes/chatRoutes');
    app.use('/chat', chatRoutes(chatCollection));
    // endpoint2: /products/:id
    app.get('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await productsCollection.findOne(query)
        res.send(result)
    });
    // endpoint3: add to cart (post method)
    // app.post('/cart', async (req, res) => {
    //     const Cartitem = req.body;
    //     const result = await cartCollection.insertOne(Cartitem);
    //     res.send(result);
    // });
    app.post('/cart', async (req, res) => {
    try {
        const cartItem = req.body;

        if (!cartItem || Object.keys(cartItem).length === 0) {
            return res.status(400).send({ error: 'Cart item data is required' });
        }

        const result = await cartCollection.insertOne(cartItem);
        res.send(result);
    } catch (error) {
        console.error('POST /cart error:', error);
        res.status(500).send({ error: 'Failed to add item to cart' });
      }
    });
    // endpoint4: get all cart items
    app.get('/cart', async (req, res) => {
        const cursor = cartCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    });
    // endpoint5: delete one cart item
    app.delete('/cart/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await cartCollection.deleteOne(query);
        res.send(result);
    });
    // endpoint6: clear cart
    app.delete('/cart', async (req, res) => {
        const result = await cartCollection.deleteMany({});
        res.send(result);
    });
    // endpoint7: update cart item quantity
    app.put('/cart/:id', async (req, res) => {
        const id = req.params.id;
        const { quantity } = req.body;

        const query = { _id: new ObjectId(id) };
        const updateDoc = { $set: { quantity } };

        const result = await cartCollection.updateOne(query, updateDoc);
        res.send(result);
    });


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