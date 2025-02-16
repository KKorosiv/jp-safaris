import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-400 text-white py-10 relative" data-aos="fade-up">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
     
        <div>
          <h2 className="text-2xl font-bold mb-3">JP-Safaris</h2>
          <p className="text-gray-300">Explore Africa’s wonders with us. Your adventure begins here!</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-green-400 transition text-2xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-400 transition text-2xl"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400 transition text-2xl"><FaTiktok /></a>
            <a href="#" className="hover:text-green-400 transition text-2xl"><FaWhatsapp /></a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
          <p className="text-gray-300">Need help? Call us:</p>
          <p className="text-lg font-bold text-green-300 cursor-pointer">+254 722 831 876</p>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className="absolute bottom-10 right-10 bg-green-400 p-3 rounded-full text-white hover:bg-green-600 transition"
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;