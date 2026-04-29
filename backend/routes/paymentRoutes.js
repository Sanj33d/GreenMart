// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).send({ error: "Valid amount is required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).send({ error: error.message });
//   }
// });

// module.exports = router;

// v2
const express = require('express');
const router = express.Router();

const {
  createPaymentIntent,
} = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;