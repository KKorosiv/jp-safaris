import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card bg-white shadow-md rounded-lg p-6 m-4">
      <div className="flex items-center">
        <img 
          src={testimonial.profileImage} 
          alt={testimonial.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-gray-600">{testimonial.message}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
