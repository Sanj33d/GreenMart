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
    deadline: "",
    notes: "",
  });

  // payment method state
  const [paymentMethod, setPaymentMethod] = useState("card");
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

  // useffect v1
  // useEffect(() => {
  //   setClientSecret("");
  //   if (!cart?.length || amountInCents <= 0 || !isShippingValid) return;

  //   fetch("http://localhost:1272/payment/create-payment-intent", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ amount: amountInCents }), // only amount needed
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.clientSecret) setClientSecret(data.clientSecret);
  //     })
  //     .catch(() => setError("Failed to create payment intent"));
  // }, [amountInCents, isShippingValid]); // ✅ no `shipping`, no `cart`

  // useEffect v2
  useEffect(() => {
    setClientSecret("");

    if (paymentMethod !== "card") return;
    if (!cart?.length || amountInCents <= 0 || !isShippingValid) return;

    fetch("http://localhost:1272/payment/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Failed to create payment intent"));
  }, [amountInCents, isShippingValid, paymentMethod]);

  // handleSubmit v1
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   // stripe workflow
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   // card input value nilam
  //   const card = elements.getElement(CardElement);

  //   if (!card) {
  //     return;
  //   }

  //   if (!isShippingValid) {
  //     setError("Please fill shipping information first.");
  //     return;
  //   }

  //   if (!clientSecret) {
  //     setError("Payment is not ready yet. Please wait a moment.");
  //     return;
  //   }

  //   // stripeStep1: creating payment method to check whether stripe works

  //   // const { error, paymentMethod } = await stripe.createPaymentMethod({
  //   //   type: "card",
  //   //   card,
  //   // });

  //   // //
  //   // if (error) {
  //   //   console.log("amader error", error);
  //   //   setError(error.message);
  //   // } else {
  //   //   console.log("payment method", paymentMethod);
  //   //   setError("");
  //   // }

  //   // stripeStep2: create stripe intent in backend
  //   // stripeStep3: confirm payment
  //   const { error: confirmError, paymentIntent } =
  //     await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card,
  //         billing_details: {
  //           name: shipping.fullName,
  //           phone: shipping.phone,
  //           email: user?.email || "guest@example.com",
  //           address: {
  //             line1: shipping.address,
  //             city: shipping.city,
  //             postal_code: shipping.postalCode,
  //           },
  //         },
  //       },
  //     });

  //   if (confirmError) {
  //     setError(confirmError.message);
  //     return;
  //   }

  //   // v1
  //   if (paymentIntent?.status === "succeeded") {
  //     console.log("Payment success:", paymentIntent);

  //     // saving the shipping info from ui to backend (db 'orders')
  //     const orderData = {
  //       email: user?.email, // from AuthContext (important)
  //       amount: amountInCents, // or totalPrice
  //       currency: "bdt",

  //       transactionId: paymentIntent.id,
  //       items: cart.map((i) => ({
  //         productId: i._id,
  //         title: i.title,
  //         price: i.price,
  //         quantity: i.quantity,
  //       })),
  //       // shipping, // the shipping form state you added
  //     };

  //     await fetch("http://localhost:1272/orders", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({
  //         userEmail: user.email,
  //         items: cartItems,
  //         totalAmount: totalPrice,
  //         paymentIntentId: paymentIntent.id,
  //         shippingInfo: shipping,
  //       }),
  //     });

  //     // clear cart after successful payment
  //     // clearCart();

  //     setCartItems([]);

  //     setSuccess(
  //       "✅Payment successful! Redirecting you to the home page in 3 seconds",
  //     );
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 4000);
  //   }
  // };

  // handleSubmit v1
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isShippingValid) {
      setError("Please fill shipping information first.");
      return;
    }

    if (paymentMethod === "cod") {
      const res = await fetch("http://localhost:1272/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          items: cartItems,
          totalAmount: totalPrice,
          paymentIntentId: null,
          shippingInfo: shipping,
          paymentMethod: "cod",
          paymentStatus: "cash_on_delivery",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to place cash on delivery order");
        return;
      }

      setCartItems([]);

      setSuccess("✅ Cash on Delivery order placed! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);

      return;
    }

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    if (!clientSecret) {
      setError("Payment is not ready yet. Please wait a moment.");
      return;
    }

    const pendingOrderRes = await fetch("http://localhost:1272/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        items: cartItems,
        totalAmount: totalPrice,
        paymentIntentId: null,
        shippingInfo: shipping,
        paymentMethod: "card",
        paymentStatus: "pending",
      }),
    });

    const pendingOrderData = await pendingOrderRes.json();

    if (!pendingOrderRes.ok) {
      setError(pendingOrderData?.error || "Failed to create pending order");
      return;
    }

    const orderId = pendingOrderData.result.insertedId;

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
      await fetch(`http://localhost:1272/orders/${orderId}/payment-status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          paymentStatus: "failed",
          failureReason: confirmError.message,
        }),
      });

      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // fetch v1
      // await fetch(`http://localhost:1272/orders/${orderId}/payment-status`, {
      //   method: "PATCH",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({
      //     paymentStatus: "paid",
      //     failureReason: "",
      //   }),
      // });

      // fetch v2
      await fetch(`http://localhost:1272/orders/${orderId}/payment-status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          paymentStatus: "paid",
          failureReason: "",
          paymentIntentId: paymentIntent.id,
        }),
      });

      setCartItems([]);

      setSuccess("✅ Payment successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const formattedTotal = Number(totalPrice).toFixed(2);
  
  console.log(shipping)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-700 space-y-8"
      >
        {/* shipping inputs */}
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-wide">
              Checkout
            </p>
            <h2 className="text-3xl font-bold text-white">
              Shipping Information
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Enter your delivery details carefully.
            </p>
          </div>

          <div className="grid gap-4">
            <input
              className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              name="fullName"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={handleShippingChange}
              required
            />

            <input
              className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              name="phone"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={handleShippingChange}
              required
            />

            <input
              className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              name="address"
              placeholder="Full Address"
              value={shipping.address}
              onChange={handleShippingChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleShippingChange}
                required
              />

              <input
                className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                name="postalCode"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={handleShippingChange}
                required
              />

              
            </div>

            <input
              className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              name="deadline"
              type="date"
              placeholder="Deadline"
              value={shipping.deadline}
              onChange={handleShippingChange}
              required
            />

            <textarea
              className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 outline-none transition resize-none min-h-24 focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              name="notes"
              placeholder="Notes (optional)"
              value={shipping.notes}
              onChange={handleShippingChange}
            />
          </div>
        </div>

        {/* payment method (cod or card) */}
        <div>
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-white">Payment Method</h2>
            <p className="text-sm text-gray-400 mt-1">
              Choose how you want to pay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div
                className={`p-4 rounded-xl border transition ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-500/10 text-blue-300"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              >
                Pay with Card
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div
                className={`p-4 rounded-xl border transition ${
                  paymentMethod === "cod"
                    ? "border-green-500 bg-green-500/10 text-green-300"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              >
                Cash on Delivery
              </div>
            </label>
          </div>
        </div>

        {/* card input v1 */}
        {/* <div>
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-white">Card Information</h2>
            <p className="text-sm text-gray-400 mt-1">
              Your payment is securely processed by Stripe.
            </p>
          </div>

          
          <div className="p-4 text-white border border-gray-700 rounded-xl bg-gray-200 shadow-inner focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition">
            <CardElement className="w-full text-white" />
          </div>
        </div> */}

        {/* card input v2 */}
        {paymentMethod === "card" && (
          <div>
            <div className="mb-5">
              <h2 className="text-3xl font-bold text-white">
                Card Information
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Your payment is securely processed by Stripe.
              </p>
            </div>

            <div className="p-4 text-white border border-gray-700 rounded-xl bg-gray-200 shadow-inner focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition">
              <CardElement className="w-full text-white" />
            </div>
          </div>
        )}

        {/* form btn */}
        {/* <button
          type="submit"
          disabled={!stripe || !clientSecret || !isShippingValid}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/40 transition disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Pay $ {formattedTotal}
        </button> */}

        {/* form btn v2 */}
        <button
          type="submit"
          disabled={
            !isShippingValid ||
            (paymentMethod === "card" && (!stripe || !clientSecret))
          }
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/40 transition disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {paymentMethod === "cod"
            ? `Place COD Order ৳ ${formattedTotal}`
            : `Pay ৳ ${formattedTotal}`}
        </button>

        {/* error display */}
        <div className="text-center text-sm">
          {error && (
            <p className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-900/30 text-green-400 border border-green-800 px-4 py-2 rounded-lg mt-3">
              {success}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
