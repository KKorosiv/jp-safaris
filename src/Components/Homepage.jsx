import React, { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Hook to detect when the stats section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation happens only once
    threshold: 0.3, // Triggers when 30% of the section is visible
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle button click and navigate to the tours page
  const handleStartJourney = () => {
    navigate("/tours");
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Video Background */}
      <div className="h-screen relative">
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/safari.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-green bg-opacity-30"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Explore The World with <span className="text-green-400">JP Travels</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl">
            Discover breathtaking destinations, immerse yourself in new cultures, and create unforgettable memories. Adventure awaits!
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600">Discover JP-Travels</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            JP-Travels is dedicated to creating unforgettable safari experiences that 
            connect travelers with the breathtaking beauty of nature and wildlife. Our mission 
            is to provide exceptional service and memorable adventures, ensuring that every journey 
            is unique and enriching. We value integrity, customer satisfaction, sustainability, and 
            adventure. Join us in exploring the wild and creating lasting memories.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <div ref={ref} className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10" data-aos="fade-up">
        <div className="w-full lg:w-1/2">
          <img src="/elephground.jpg" alt="Safari Tour" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ end: 150, text: "+ tours" }, { end: 5, text: "+ years" }, { end: 2000, text: "+ happy clients" }, { end: 30, text: "+ destinations" }].map((stat, index) => (
            <div key={index} data-aos="fade-up">
              <h2 className="text-2xl font-bold text-green-600">
                {inView ? <CountUp end={stat.end} duration={8} /> : 0} {stat.text}
              </h2>
              <p className="text-gray-700">
                {index === 0 && "We have successfully organized over 100 tours, showcasing our commitment to excellence."}
                {index === 1 && "With over 5 years of experience in the industry, we ensure every tour is a unique adventure."}
                {index === 2 && "Join the ranks of over 2,000 satisfied clients who have experienced the thrill of our safari tours."}
                {index === 3 && "Explore a variety of breathtaking destinations across Africa with us."}
              </p>
            </div>
          ))}

          {/* "Start Your Journey" Button */}
          <div className="w-full mt-6 flex justify-start">
            <button
              onClick={handleStartJourney} // Add the onClick event
              className="px-6 py-3 bg-green-600 text-white font-semibold text-lg cursor-pointer rounded-lg shadow-lg hover:bg-green-400 transition duration-300"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
