import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BookingSection from "./BookingSection";

const Tours = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const tours = [
    {
      id: 1,
      title: "Savannah Adventure",
      description: "Experience the vast open plains and incredible wildlife of the savannah.",
      image: "/savannah.jpg",
    },
    {
      id: 2,
      title: "Jungle Expedition",
      description: "Venture into the lush jungles and discover exotic flora and fauna.",
      image: "/jungle.jpg",
    },
    {
      id: 3,
      title: "Desert Safari",
      description: "Explore the golden dunes and experience the magic of the desert.",
      image: "/desert.jpg",
    },
    {
      id: 4,
      title: "Mountain Trekking",
      description: "Hike through breathtaking mountain landscapes and scenic trails.",
      image: "/leyoo.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Grid layout for title and description */}
      <div className="grid md:grid-cols-2 gap-6 items-center" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-green-600">
          Explore Our Exciting Safari Tours
        </h1>
        <p className="text-gray-700 max-w-2xl">
          Discover the adventure of a lifetime with Sam Henia Travels. Our safari tours offer a unique 
          opportunity to explore the stunning landscapes and diverse wildlife of Africa. Compare our 
          various tour options, each with detailed itineraries, competitive pricing, and flexible dates 
          to suit your schedule.
        </p>
      </div>

      {/* Grid layout for tour cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {tours.map((tour, index) => (
          <div 
            key={tour.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 600} // Adds a delay for staggered animation
          >
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-700">{tour.title}</h3>
              <p className="text-gray-600 mt-2">{tour.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Section */}
      <BookingSection />
    </div>
  );
};

export default Tours;