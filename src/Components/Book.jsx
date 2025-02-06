import React from "react";

const Book = () => {
  return (
    <div className="bg-green-900 text-white py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <h2 className="text-4xl font-bold">
          Effortlessly Book Your <br /> Safari Adventure Online
        </h2>
        <p className="text-lg">
          Explore our diverse range of safari tours and book your adventure with ease. Our 
          user-friendly online platform ensures a smooth booking process, allowing you to select 
          your preferred tour dates and accommodations effortlessly.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 text-white mb-12">
        <div>
          <h3 className="text-2xl font-bold">Easy Booking</h3>
          <p>Select your tour, choose dates, and book online.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Tour Options</h3>
          <p>Discover a variety of tours tailored to your interests.</p>
        </div>
      </div>

      {/* Image Grid + Booking CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <img src="/safari.jpg" alt="Safari Tour 1" className="rounded-xl" />
        <img src="/leyoo.jpg" alt="Safari Tour 2" className="rounded-xl" />
        <img src="/deers.jpg" alt="Safari Tour 3" className="rounded-xl" />
        <img src="/brows.jpg" alt="Safari Tour 4" className="rounded-xl" />
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Book;