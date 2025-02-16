import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Account = ({ isPanelOpen, togglePanel }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTestimonialSubmit = () => {

    console.log("Testimonial submitted:", testimonial);
    setTestimonial("");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform ${
        isPanelOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <div className="p-6">
        <button
          onClick={togglePanel}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Close
        </button>

        {user ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Welcome back, {user.name}!</h2>
            <p className="mb-4">We're glad to see you again. Ready to explore?</p>
            <Link
              to="/tours"
              className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-4"
            >
              Explore Tours
            </Link>
            
            <p className="text-lg mb-4">Share about your recent tour:</p>
            <textarea
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Write your testimonial..."
            />
            <button
              onClick={handleTestimonialSubmit}
              className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add Testimonial
            </button>
            <br />
            <button
              onClick={handleLogout}
              className="block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mb-4"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <p className="text-lg mb-4">Please log in to access your account details.</p>
            <Link
              to="/login"
              className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
