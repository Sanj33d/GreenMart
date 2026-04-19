const express = require('express');
const cors = require('cors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const chatRoutes = require('./routes/chatRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// app.use(cors({
//   origin: 'https://greenmart-44b85.web.app',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GreenMart server is runningggg');
});

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/chat', chatRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;