import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Tours from "./Components/Tours";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BookingForm from "./Components/BookingForm";
import PaymentForm from "./Components/PaymentForm";
import Testimonials from "./Components/Testimonials";
import Account from "./Components/Account";
import { AuthProvider, ProtectedRoute, AdminProtectedRoute } from "./Components/AuthContext";
import Dashboard from "./Components/Dashboard"; 
import ContactUs from "./Components/ContactUs";
const stripePromise = loadStripe("your-publishable-key-here");

const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <AuthProvider>
      <Router basename="/jp-travels"> 
        <ScrollToTop />
        <Navbar togglePanel={togglePanel} />
        <Account isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account isPanelOpen={true} togglePanel={togglePanel} /></ProtectedRoute>} /> 
          <Route 
            path="/payment" 
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            } 
          />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
