import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    
    const fetchedTestimonials = [
      {
        profileImage: '/image1.jpg',
        name: 'Henia Sam',
        message: 'This was an amazing experience!',
      },
      {
        profileImage: '/image2.jpg',
        name: 'Sam Henia',
        message: 'I had a fantastic time on this tour!',
      },

    ];
    setTestimonials(fetchedTestimonials);
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">What Our Customers Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
