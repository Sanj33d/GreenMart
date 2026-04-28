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
  const { user } = useContext(AuthContext);

  const handleShippingChange = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  //
  //   const { totalPrice, cart, clearCart } = useCart();
  const { cartItems, handleClearCart, setCartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cart = cartItems; // for easier reference in payment intent creation
  const [clientSecret, setClientSecret] = useState("");
  // taka to paysa
  const amountInCents = Math.round(Number(totalPrice) * 100);

  // useEffect v1
  // useEffect(() => {
  //   // only create intent if cart has something
  //   if (!cart?.length || amountInCents <= 0) return;
  //   //
  //   if (!isShippingValid) return;

  //   fetch("http://localhost:1272/payment/create-payment-intent", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ amount: amountInCents, shipping, cart }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.clientSecret) setClientSecret(data.clientSecret);
  //     })
  //     .catch(() => setError("Failed to create payment intent"));
  // }, [amountInCents, cart, isShippingValid, shipping]);
  // v2
  useEffect(() => {
    setClientSecret("");
    if (!cart?.length || amountInCents <= 0 || !isShippingValid) return;

    fetch("http://localhost:1272/payment/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }), // only amount needed
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Failed to create payment intent"));
  }, [amountInCents, isShippingValid]); // ✅ no `shipping`, no `cart`

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
        payment_method: {
          card,
          billing_details: {
            name: shipping.fullName,
            phone: shipping.phone,
            email: user?.email || "guest@example.com",
            address: {
              line1: shipping.address,
              city: shipping.city,
              postal_code: shipping.postalCode,
            },
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    // v1
    if (paymentIntent?.status === "succeeded") {
      console.log("Payment success:", paymentIntent);

      // saving the shipping info from ui to backend (db 'orders')
      const orderData = {
        email: user?.email, // from AuthContext (important)
        amount: amountInCents, // or totalPrice
        currency: "bdt",

        transactionId: paymentIntent.id,
        items: cart.map((i) => ({
          productId: i._id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
        })),
        // shipping, // the shipping form state you added
      };

      await fetch("http://localhost:1272/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          items: cartItems,
          totalAmount: totalPrice,
          paymentIntentId: paymentIntent.id,
          shippingInfo: shipping,
        }),
      });

      // clear cart after successful payment
      // clearCart();
      
      setCartItems([]);
      
      setSuccess(
        "✅Payment successful! Redirecting you to the home page in 3 seconds",
      );
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  //v2
  //   if (paymentIntent?.status === "succeeded") {
  //     console.log("Payment success:", paymentIntent);

  //     try {
  //       const response = await fetch("http://localhost:1272/orders", {
  //         method: "POST",
  //         headers: { "content-type": "application/json" },
  //         body: JSON.stringify({
  //           userEmail: user?.email,
  //           items: cartItems,
  //           totalAmount: amountInCents,
  //           paymentIntentId: paymentIntent.id,
  //           shippingInfo: shipping,
  //         }),
  //       });

  //       const data = await response.json();
  //       console.log("Order saved:", data);

  //       if (!response.ok) {
  //         setError(data?.error || "Failed to save order");
  //         return;
  //       }

  //       await handleClearCart();

  //       setSuccess(
  //         "✅ Payment successful! Redirecting you to the home page in 3 seconds",
  //       );

  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Payment succeeded, but order finalization failed.");
  //     }
  //   }
  // };
  const formattedTotal = Number(totalPrice).toFixed(2);
  //

  return (
    // <div>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white p-6 rounded-xl max-w-md mx-auto"
    //   >
    //     {/* shipping inputs */}
    //     <h2 className="text-xl font-bold mb-3 text-gray-900">
    //       Shipping Information
    //     </h2>

    //     <div className="grid gap-3 mb-4">
    //       <input
    //         className="input input-bordered"
    //         name="fullName"
    //         placeholder="Full Name"
    //         value={shipping.fullName}
    //         onChange={handleShippingChange}
    //         required
    //       />
    //       <input
    //         className="input input-bordered"
    //         name="phone"
    //         placeholder="Phone"
    //         value={shipping.phone}
    //         onChange={handleShippingChange}
    //         required
    //       />
    //       <input
    //         className="input input-bordered"
    //         name="address"
    //         placeholder="Full Address"
    //         value={shipping.address}
    //         onChange={handleShippingChange}
    //         required
    //       />

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    //         <input
    //           className="input input-bordered"
    //           name="city"
    //           placeholder="City"
    //           value={shipping.city}
    //           onChange={handleShippingChange}
    //           required
    //         />
    //         <input
    //           className="input input-bordered"
    //           name="postalCode"
    //           placeholder="Postal Code"
    //           value={shipping.postalCode}
    //           onChange={handleShippingChange}
    //           required
    //         />
    //       </div>

    //       <textarea
    //         className="textarea textarea-bordered"
    //         name="notes"
    //         placeholder="Notes (optional)"
    //         value={shipping.notes}
    //         onChange={handleShippingChange}
    //       />
    //     </div>

    //     <h2 className="text-xl font-bold mb-3 text-gray-900">
    //       Card Information
    //     </h2>

    //     {/* stripe card input */}
    //     <CardElement className="p-2 border-5 rounded-xl "></CardElement>

    //     {/* form btn */}
    //     <button
    //       type="submit"
    //       disabled={!stripe || !clientSecret || !isShippingValid}
    //       className="btn btn-primary w-full"
    //     >
    //       Pay ৳ {formattedTotal}
    //     </button>

    //     {/* error display */}
    //     {error && <p className="text-red-500">{error}</p>}
    //     {success && <p className="text-green-600 mt-3">{success}</p>}
    //   </form>
    // </div>

    // v2
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-12">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-xl rounded-3xl border border-slate-700/70 bg-slate-900/90 p-8 text-white shadow-2xl backdrop-blur-md"
  >
    {/* Header */}
    <div className="mb-8 text-center">
      <p className="mb-2 text-xs uppercase tracking-[4px] text-indigo-300">
        Secure Checkout
      </p>
      <h1 className="text-3xl font-extrabold">Complete Your Order</h1>
      <p className="mt-2 text-sm text-slate-400">
        Enter your shipping details and payment information below.
      </p>
    </div>

    {/* Shipping Section */}
    <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
          1
        </div>
        <h2 className="text-xl font-bold">Shipping Information</h2>
      </div>

      <div className="grid gap-4">
        <input
          className="input input-bordered w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="fullName"
          placeholder="Full Name"
          value={shipping.fullName}
          onChange={handleShippingChange}
          required
        />

        <input
          className="input input-bordered w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="phone"
          placeholder="Phone"
          value={shipping.phone}
          onChange={handleShippingChange}
          required
        />

        <input
          className="input input-bordered w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="address"
          placeholder="Full Address"
          value={shipping.address}
          onChange={handleShippingChange}
          required
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            className="input input-bordered w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleShippingChange}
            required
          />
          <input
            className="input input-bordered w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="postalCode"
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={handleShippingChange}
            required
          />
        </div>

        <textarea
          className="textarea textarea-bordered min-h-24 w-full bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="notes"
          placeholder="Notes (optional)"
          value={shipping.notes}
          onChange={handleShippingChange}
        />
      </div>
    </div>

    {/* Card Section */}
    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
          2
        </div>
        <h2 className="text-xl font-bold">Card Information</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-white p-4 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500">
        <CardElement />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Payments are processed securely through Stripe.
      </p>
    </div>

    {/* Total + Button */}
    <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-slate-300">Total Payable</span>
        <span className="text-2xl font-extrabold text-indigo-300">
          ৳ {formattedTotal}
        </span>
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || !isShippingValid}
        className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Pay ৳ {formattedTotal}
      </button>
    </div>

    {/* Messages */}
    {error && (
      <p className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-300">
        {error}
      </p>
    )}

    {success && (
      <p className="mt-5 rounded-xl border border-green-500/40 bg-green-500/10 p-3 text-center text-sm text-green-300">
        {success}
      </p>
    )}
  </form>
</div>
  );
};

export default PaymentForm;
