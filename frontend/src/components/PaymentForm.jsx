import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
// import { useCart } from "../../context/CartContext/CartContext";
import { CartContext } from "../context/CartContext/CartContext";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router";

const PaymentForm = () => {
  // using stripe
  const stripe = useStripe();
  // useElements(): to use stripe's getElement()
  const elements = useElements();
 
  const navigate = useNavigate();
  // shipping info
  const [shipping, setShipping] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
  });
  // 
  const isShippingValid =
  shipping.fullName &&
  shipping.phone &&
  shipping.address &&
  shipping.city &&
  shipping.postalCode;

  // 
  const {user} = useContext(AuthContext)


  const handleShippingChange = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  //
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  //
//   const { totalPrice, cart, clearCart } = useCart();
const { cartItems, handleClearCart } = useContext(CartContext);
const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
const cart = cartItems; // for easier reference in payment intent creation
  const [clientSecret, setClientSecret] = useState("");
  // taka to paysa
  const amountInCents = Math.round(Number(totalPrice) * 100);

  // useEffect
  useEffect(() => {
    // only create intent if cart has something
    if (!cart?.length || amountInCents <= 0) return;
    // 
    if (!isShippingValid) return;

    fetch("http://localhost:1272/payment/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount: amountInCents, 
        shipping,
        cart
       }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Failed to create payment intent"));
  }, [amountInCents, cart, isShippingValid, shipping]);

  // form btn func
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // stripe workflow
    if (!stripe || !elements) {
      return;
    }
    // card input value nilam
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    if (!isShippingValid) {
  setError("Please fill shipping information first.");
  return;
}

if (!clientSecret) {
  setError("Payment is not ready yet. Please wait a moment.");
  return;
}


    // stripeStep1: creating payment method to check whether stripe works

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // //
    // if (error) {
    //   console.log("amader error", error);
    //   setError(error.message);
    // } else {
    //   console.log("payment method", paymentMethod);
    //   setError("");
    // }

    // stripeStep2: create stripe intent in backend
    // stripeStep3: confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card, 
          billing_details: {
        name: shipping.fullName,
        phone: shipping.phone,
        email: user?.email || "guest@example.com",
        address: {
          line1: shipping.address,
          city: shipping.city,
          postal_code: shipping.postalCode,
        },
      }
         },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      console.log("Payment success:", paymentIntent);
      
      // saving the shipping info from ui to backend (db 'orders')
      const orderData = {
  email: user?.email,          // from AuthContext (important)
  amount: amountInCents,       // or totalPrice
  currency: "bdt",
  transactionId: paymentIntent.id,
  items: cart.map(i => ({
    productId: i._id,
    title: i.title,
    price: i.price,
    quantity: i.quantity,
  })),
  shipping, // the shipping form state you added
};

await fetch("http://localhost:1272/orders", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(orderData),
});


      // clear cart after successful payment
      clearCart();
      setSuccess("✅Payment successful! Redirecting you to the home page in 3 seconds")
      setTimeout(() => {
      navigate("/");
    }, 4000);

      // you can navigate to success page if you want
      // navigate("/payment-success");
    }
  };

  // 
  const formattedTotal = Number(totalPrice).toFixed(2);
  // 
  
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl max-w-md mx-auto"
      >
        {/* shipping inputs */}
        <h2 className="text-xl font-bold mb-3 text-gray-900">Shipping Information</h2>

<div className="grid gap-3 mb-4">
  <input
    className="input input-bordered"
    name="fullName"
    placeholder="Full Name"
    value={shipping.fullName}
    onChange={handleShippingChange}
    required
  />
  <input
    className="input input-bordered"
    name="phone"
    placeholder="Phone"
    value={shipping.phone}
    onChange={handleShippingChange}
    required
  />
  <input
    className="input input-bordered"
    name="address"
    placeholder="Full Address"
    value={shipping.address}
    onChange={handleShippingChange}
    required
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <input
      className="input input-bordered"
      name="city"
      placeholder="City"
      value={shipping.city}
      onChange={handleShippingChange}
      required
    />
    <input
      className="input input-bordered"
      name="postalCode"
      placeholder="Postal Code"
      value={shipping.postalCode}
      onChange={handleShippingChange}
      required
    />
  </div>

  <textarea
    className="textarea textarea-bordered"
    name="notes"
    placeholder="Notes (optional)"
    value={shipping.notes}
    onChange={handleShippingChange}
  />
</div>

<h2 className="text-xl font-bold mb-3 text-gray-900">Card Information</h2>

        {/* stripe card input */}
        <CardElement className="p-2 border-5 rounded-xl "></CardElement>

        {/* form btn */}
        <button
          type="submit"
          disabled={!stripe|| !clientSecret || !isShippingValid}
          className="btn btn-primary w-full"
        >
          Pay ৳ {formattedTotal}
        </button>

        {/* error display */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
