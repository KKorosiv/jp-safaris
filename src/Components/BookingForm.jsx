import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const tour = location.state?.selectedTour || {}; 

  const [numPeople, setNumPeople] = useState(1);
  const [days, setDays] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const totalPrice = (tour.fee ? parseFloat(tour.fee.replace("$", "")) : 0) * numPeople * days;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
    
      <div className="flex items-center gap-4 mb-6">
        <img src="/jp-travels/logo-safaris.jpg" alt="Logo" className="w-12 h-12" />
        <h2 className="text-2xl font-bold">Booking Details</h2>
      </div>

    
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
   
        <div>
          {tour.image ? (
            <img src={tour.image} alt={tour.title} className="w-full h-60 object-cover rounded-lg" />
          ) : (
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg">
              No Image Available
            </div>
          )}
          <h3 className="text-xl font-semibold mt-4">{tour.title || "Tour Name"}</h3>
          <p className="text-gray-600">{tour.description || "Tour description not available."}</p>
          <p className="mt-2 font-bold">Location: {tour.location || "Not specified"}</p>
          <p className="mt-1 font-bold">Price per person: ${tour.fee || "N/A"}</p>
        </div>


        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Number of People"
            value={numPeople}
            onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full p-2 border rounded-md"
            min="1"
          />
          <input
            type="number"
            placeholder="Days to Spend"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full p-2 border rounded-md"
            min="1"
          />

          <p className="font-bold text-lg">Total Price: ${totalPrice.toFixed(2)}</p>

          <Link
            to="/payment"
            className={`block w-full text-center py-2 rounded-md ${
              formData.fullName && formData.phone && formData.email
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            state={{ tour, totalPrice, numPeople, days }}
            onClick={(e) => {
              if (!formData.fullName || !formData.phone || !formData.email) {
                e.preventDefault();
                alert("Please fill in all fields before proceeding.");
              }
            }}
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
