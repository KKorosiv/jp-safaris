import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import Link and useLocation
import { useAuth } from "./AuthContext"; // Importing the auth context
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook
  const { user } = useAuth(); // Get user from AuthContext
  const location = useLocation(); // Get the current location (path)

  const handleBookNowClick = () => {
    if (!user) {
      // If user is not logged in, redirect to Register page
      navigate("/register");
    } else {
      // If user is logged in, proceed to the Book page
      navigate("/book");
    }
  };

  // Function to add active class with an underline
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-green-300 font-semibold border-b-2 border-green-300 transition-all duration-300"
      : "hover:text-green-300 transition-all duration-300";
  };

  return (
    <nav className="bg-gray-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Sam-Henia Travels" className="h-10" />
          <span className="text-xl font-bold">JP Travels</span>
        </div>

        {/* Nav Links Centered */}
        <div className="flex-1 hidden md:flex justify-center space-x-6">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/tours" className={getLinkClass("/tours")}>Tours</Link>
          <Link to="/tourdetails" className={getLinkClass("/tourdetails")}>Tour Details</Link>
          <Link to="/contact" className={getLinkClass("/contact")}>Contact Us</Link>
        </div>

        {/* Book Now Button on the Right */}
        <div className="hidden md:block ml-auto">
          <button 
            onClick={handleBookNowClick} // Update to handle the logic
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 text-white text-center py-4 space-y-4">
          <Link to="/" className={`block ${getLinkClass("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/tours" className={`block ${getLinkClass("/tours")}`} onClick={() => setIsOpen(false)}>Tours</Link>
          <Link to="/tourdetails" className={`block ${getLinkClass("/tourdetails")}`} onClick={() => setIsOpen(false)}>Tour Details</Link>
          <Link to="/contact" className={`block ${getLinkClass("/contact")}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
          <button 
            onClick={handleBookNowClick} // Combined logic
            className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mx-auto w-32"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
