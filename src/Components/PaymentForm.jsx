import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
 
      console.log(paymentMethod);
      setLoading(false);
    }
  };

  const handleMpesaClick = () => {
    setShowMpesaPayment(true);
  };

  const handlePaypalClick = () => {
    setShowPaypalButton(true);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID";
    script.addEventListener("load", () => setShowPaypalButton(true));
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full py-6 bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <img src="/jp-travels/logo-safaris.jpg" alt="Logo" className="h-10"/>
          <h1 className="text-xl font-bold text-gray-900">Pay Now</h1>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full p-4">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
          <CardElement className="border p-2 w-full mb-4" />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white p-2 w-full"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Lipa na M-PESA</h2>
          <button
            className="bg-green-500 text-white p-2 w-full mb-2"
            onClick={handleMpesaClick}
          >
            Pay with M-PESA
          </button>
          {showMpesaPayment && <MpesaPayment />}
        </div>

        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">PayPal</h2>
          <button className="bg-blue-500 text-white p-2 w-full" onClick={handlePaypalClick}>
            Pay with PayPal
          </button>
          {showPaypalButton && <PayPalButton />}
        </div>
      </div>
    </div>
  );
};

const MpesaPayment = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleMpesaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setResponseMessage("Payment initiated successfully. Please check your phone to complete the payment.");
      } else {
        setResponseMessage(data.error || "Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating STK push:", error);
      setLoading(false);
      setResponseMessage("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleMpesaSubmit} className="p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">M-PESA Payment</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" disabled={loading} className="bg-green-500 text-white p-2 w-full">
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {responseMessage && <p className="mt-4 text-red-500">{responseMessage}</p>}
    </form>
  );
};

const PayPalButton = () => {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: 'YOUR_AMOUNT'
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          console.log(details);
    
        });
      },
      onError: (err) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PaymentForm;
