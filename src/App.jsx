import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Tours from "./Components/Tours";
import TourDetails from "./Components/TourDetails";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BookingForm from "./Components/BookingForm";
import PaymentForm from "./Components/PaymentForm";
import { AuthProvider, ProtectedRoute, AdminProtectedRoute } from "./Components/AuthContext";
import Dashboard from "./Components/Dashboard"; // ✅ Import the admin dashboard

const stripePromise = loadStripe("your-publishable-key-here");

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tourdetails" element={<TourDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          <Route 
            path="/payment" 
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            } 
          />
          {/* ✅ Protect Admin Dashboard Route */}
          <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
