import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberOfPeople: 1,
    date: "",
    tourPackage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or navigate to payment
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-x-4">
        <img src="/logo.png" alt="Sam-Henia Travels" className="h-10" />
        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

        </div>
    
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />

        <input
          type="number"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />

        <select
          name="tourPackage"
          value={formData.tourPackage}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Tour Package</option>
          <option value="tour1">Tour Package 1</option>
          <option value="tour2">Tour Package 2</option>
          <option value="tour3">Tour Package 3</option>
        </select>

        <button type="submit" className="bg-green-500 text-white p-2 w-full">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default BookingForm;
