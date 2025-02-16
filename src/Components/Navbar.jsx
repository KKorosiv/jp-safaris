import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Menu, X } from "lucide-react";
import { FaUser } from "react-icons/fa";

const Navbar = ({ togglePanel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleBookNowClick = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/book");
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-green-300 font-semibold border-b-2 border-green-300 transition-all duration-300"
      : "hover:text-green-300 transition-all duration-300";
  };

  return (
    <nav className="bg-gray-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <div className="flex items-center space-x-3">
          <img src="/jp-travels/logo-safaris.jpg" alt="JP-safaris" className="h-10" />
          <span className="text-xl font-bold">JP Safaris</span>
        </div>
        <div className="flex-1 hidden md:flex justify-center space-x-6">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/tours" className={getLinkClass("/tours")}>Tours</Link>
          <Link to="/testimonials" className={getLinkClass("/testimonials")}>Testimonials</Link>
          <Link to="/contact" className={getLinkClass("/contact")}>Contact Us</Link>
        </div>
        <div className="hidden md:block ml-auto">
          <button 
            onClick={handleBookNowClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Book Now
          </button>
        </div>

        <div className="relative hidden md:block ml-4">
          <button
            onClick={togglePanel}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <FaUser size={20} />
          </button>
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-700 text-white text-center py-4 space-y-4">
          <Link to="/" className={`block ${getLinkClass("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/tours" className={`block ${getLinkClass("/tours")}`} onClick={() => setIsOpen(false)}>Tours</Link>
          <Link to="/testimonials" className={`block ${getLinkClass("/testimonials")}`} onClick={() => setIsOpen(false)}>Testimonials</Link>
          <Link to="/contact" className={`block ${getLinkClass("/contact")}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
          <button
            onClick={handleBookNowClick}
            className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mx-auto w-32"
          >
            Book Now
          </button>

          <div className="relative">
            <button
              onClick={togglePanel}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mx-auto w-32"
            >
              <FaUser size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
