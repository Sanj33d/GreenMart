const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).send({ error: "Valid amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ error: error.message });
  }
});

// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     console.log("create-payment-intent body:", req.body);
//     console.log("amount type/value:", typeof amount, amount);
//     console.log("has secret key:", !!process.env.STRIPE_SECRET_KEY);

//     if (!amount || amount <= 0) {
//       return res.status(400).send({ error: "Valid amount is required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Number(amount),
//       currency: "bdt",
//       payment_method_types: ["card"],
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe error full:", error);
//     res.status(500).send({
//       error: error.message,
//       type: error.type,
//       code: error.code,
//     });
//   }
// });

module.exports = router;