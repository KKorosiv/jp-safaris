import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Book = () => {
  const location = useLocation();
  const [tour, setTour] = useState(() => {
    return location.state?.selectedTour || JSON.parse(localStorage.getItem("selectedTour")) || {};
  });

  useEffect(() => {
    if (tour.title) {
      localStorage.setItem("selectedTour", JSON.stringify(tour));
    }
  }, [tour]);

  return (
    <div className="bg-green-900 text-white py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold mb-6">Book Your Adventure</h2>

      {tour.title && (
        <div className="mb-6 p-4 bg-green-800 rounded-lg">
          <h3 className="text-2xl font-bold">{tour.title}</h3>
          <p className="text-lg">{tour.details}</p>
          <p className="text-xl font-semibold">Fee: {tour.fee}</p>
        </div>
      )}

      <form className="bg-white text-black p-6 rounded-lg">
        <label className="block mb-4">
          Name:
          <input type="text" className="w-full p-2 border rounded" required />
        </label>

        <label className="block mb-4">
          Email:
          <input type="email" className="w-full p-2 border rounded" required />
        </label>

        <label className="block mb-4">
          Tour Package:
          <input type="text" className="w-full p-2 border rounded bg-gray-200" value={tour.title || ""} readOnly />
        </label>

        <label className="block mb-4">
          Total Fee:
          <input type="text" className="w-full p-2 border rounded bg-gray-200" value={tour.fee || ""} readOnly />
        </label>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Book;
