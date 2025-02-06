import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle booking button click
  const handleBookTour = () => {
    navigate("/tourdetails"); // Navigate to the TourDetails page
  };

  return (
    <div
      className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between"
      data-aos="fade-up"
    >
      {/* Left Side - Heading */}
      <div className="md:w-1/2 text-center md:text-left" data-aos="fade-right">
        <h2 className="text-4xl font-extrabold text-green-600 leading-tight">
          Secure Your Safari <br /> Adventure Today!
        </h2>
      </div>

      {/* Right Side - Description & Buttons */}
      <div className="md:w-1/2 mt-6 md:mt-0" data-aos="fade-left" data-aos-delay="200">
        <p className="text-gray-700 text-lg mb-6">
          Ready to embark on an unforgettable journey? Use our secure booking form to select your desired tour and dates.
          Experience the beauty of Africa with ease and confidence, knowing your adventure awaits just a click away.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleBookTour} // Handle button click
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            Book Your Tour
          </button>
          <button
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-100 transition"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;