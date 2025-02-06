import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return; // Make sure Stripe is loaded

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      // Handle the payment logic (e.g., send paymentMethod to your backend for processing)
      console.log(paymentMethod);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>

        <CardElement className="border p-2 w-full mb-4" />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
