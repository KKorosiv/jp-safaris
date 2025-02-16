import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typed } from "react-typed";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FaTimes } from "react-icons/fa";

const Tours = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const typedRef = useRef(null);

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

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axiosInstance.get('/tours');
      console.log("Fetched Tours:", response.data);
      setTours(response.data);
      setFilteredTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
      alert("Failed to fetch tours. Please try again later.");
    }
  };

  const renderTours = (tours) => {
    console.log("Tours to Render:", tours);
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {tours.map((tour, index) => (
          <div
            key={tour._id}
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${expandedCard === index ? 'expanded-card' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 600}
            onClick={() => handleCardClick(index)}
            style={{ transition: 'all 0.3s ease' }}
          >
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4 relative"> 
              <h3 className="text-lg font-semibold text-green-700">{tour.title}</h3>
              <p className="text-gray-600 mt-2">{tour.description}</p>
              {expandedCard === index ? (
                <>
                  <p className="text-green-700 mt-2">Fee: ${tour.price}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      onClick={(e) => handleBookNow(tour, e)}
                    >
                      Book Now
                    </button>
                    <FaTimes
                      className="cursor-pointer text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(index);
                      }}
                    />
                  </div>
                </>
              ) : (
                <button
                  className="mt-4 px-4 py-2 bg-gray-200 text-green-700 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(index);
                  }}
                >
                  Learn More
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleBookNow = (selectedTour, e) => {
    e.stopPropagation();
    localStorage.setItem("selectedTour", JSON.stringify(selectedTour));
    navigate("/book", { state: { selectedTour } });
  };

  const filterToursByCategory = async (category) => {
    if (category === 'all') {
      setFilteredTours(tours);
    } else {
      try {
        const response = await axiosInstance.get(`/tours/${category}`);
        setFilteredTours(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} tours:`, error);
        alert(`Failed to fetch ${category} tours. Please try again later.`);
      }
    }
    setActiveTab(category);
  };
  

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="w-full mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10 mt-4 p-2" data-aos="fade-up">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-green-600 leading-tight">
              Discover Your <span ref={typedRef} className="typed-text"></span> Adventure
            </h1>
            <div className="flex justify-center mt-10">
              <button className={`px-4 py-2 ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-600'} rounded-lg mx-2`} onClick={() => filterToursByCategory('all')}>All Tours</button>
              <button className={`px-4 py-2 ${activeTab === 'upcoming' ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-600'} rounded-lg mx-2`} onClick={() => filterToursByCategory('upcoming')}>Upcoming Tours</button>
              <button className={`px-4 py-2 ${activeTab === 'popular' ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-600'} rounded-lg mx-2`} onClick={() => filterToursByCategory('popular')}>Popular Tours</button>
              <button className={`px-4 py-2 ${activeTab === 'most-booked' ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-600'} rounded-lg mx-2`} onClick={() => filterToursByCategory('most-booked')}>Most Booked Tours</button>
            </div>
          </div>
          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto md:mx-0">
              Embark on an unforgettable journey through Africa’s stunning landscapes. Our safari tours offer a unique blend of adventure and relaxation.
            </p>
          </div>
        </div>

        {filteredTours.length > 0 ? renderTours(filteredTours) : <p>No tours available.</p>}
      </div>
    </div>
  );
};

export default Tours;
