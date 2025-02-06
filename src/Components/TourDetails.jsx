import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typed } from "react-typed";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowDown, FaTimes } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const TourDetails = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Ensure page loads from top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "/savannah.jpg",
    "/jungle.jpg",
    "/desert.jpg",
    "/safari.jpg",
    "/wildlife.jpg",
    "/sunset.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const typedRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typedRef.current) {
      new Typed(typedRef.current, {
        strings: ["Safari", "Beach", "Savannah", "Mountain", "Lakeside"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });
    }
  }, []);

  const tours = [
    {
      title: "Savannah Adventure",
      description: "Experience the thrill of an unforgettable adventure in the vast African Savannah.",
      details: "Includes transportation, meals, and accommodations.",
      fee: "$500",
    },
    {
      title: "Jungle Exploration",
      description: "Venture deep into the jungle and experience its stunning wildlife.",
      details: "Includes hiking, wildlife tracking, and camping.",
      fee: "$700",
    },
    {
      title: "Desert Safari",
      description: "Explore the vast desert with a luxury safari experience.",
      details: "Includes luxury tents, gourmet meals, and camel rides.",
      fee: "$800",
    },
  ];

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); // Close the card if it's already open
    } else {
      setExpandedCard(index); // Open the clicked card
    }
  };

  const handleCloseCard = () => {
    setExpandedCard(null); // Close the card on close button click
  };

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10 mt-4 p-2" data-aos="fade-up">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-600 leading-tight">
            Discover Your <span ref={typedRef} className="typed-text"></span> Adventure
          </h1>
        </div>
        <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto md:mx-0">
            Embark on an unforgettable journey through Africa’s stunning landscapes. Our safari tours offer a unique blend of adventure and relaxation.
          </p>
          <div className="flex justify-start mt-4">
            <ScrollLink to="itinerarySection" smooth={true} duration={1500} className="cursor-pointer text-green-400 text-4xl">
              <FaArrowDown className="text-green-400 text-3xl inline-block animate-bounce" />
            </ScrollLink>
          </div>
        </div>
      </div>

      {/* Slideshow */}
      <div className="w-full h-[500px]" data-aos="zoom-in">
        <img src={images[currentImage]} alt="Safari" className="w-full h-full object-cover" />
      </div>

      {/* Itinerary Section */}
      <div id="itinerarySection" className="grid md:grid-cols-2 gap-8 mb-8 mt-4 p-2">
        <div className="flex items-center justify-center" data-aos="fade-right">
          <h1 className="text-3xl font-bold text-green-600">Explore Our Detailed Safari Itinerary</h1>
        </div>
        <div className="flex items-center justify-center" data-aos="fade-left">
          <p className="text-gray-700 max-w-3xl mx-auto">
            Embark on an unforgettable journey with Sam Henia Travels. Our meticulously planned safari itinerary offers a perfect blend of adventure and relaxation.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {tours.map((tour, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
              expandedCard === index ? "pb-6" : ""
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 600}
            onClick={() => handleCardClick(index)}
          >
            <img src={images[index]} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold text-green-700">{tour.title}</h3>
              <p className="text-gray-600 mt-2">{tour.description}</p>

              {/* Learn More Button */}
              {expandedCard !== index && (
                <button
                  className="mt-4 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the parent click
                    handleCardClick(index);
                  }}
                >
                  Learn More
                </button>
              )}

              {/* Expanded Section */}
              {expandedCard === index && (
                <div className="mt-4 space-y-4 transition-all duration-500 max-h-screen">
                  <p className="text-gray-700">{tour.details}</p>
                  <p className="text-xl font-semibold">Fee: {tour.fee}</p>
                  <div className="flex justify-between items-center">
                    <RouterLink to="/book" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Book Now
                    </RouterLink>
                    <button className="text-red-600 hover:text-red-800" onClick={handleCloseCard}>
                      <FaTimes size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="relative bg-cover bg-center min-h-[350px] flex flex-col items-center text-white text-center" style={{ backgroundImage: "url('/sunset.jpg')" }} data-aos="fade-up">
        <div className="p-2 mt-12">
          <h2 className="text-3xl font-bold">Secure Your Safari Experience</h2>
        </div>
        <div className="p-2 mt-4 text-left">
          <p className="mt-4">Join us for an unforgettable safari adventure! Book now to secure your spot.</p>
          <div className="mt-4">
            <RouterLink to="/book" className="px-6 py-2 bg-green-600 text-white rounded-lg mr-4 hover:bg-green-700">
              Book Now
            </RouterLink>
            <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-green-600">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
