import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [buttonText, setButtonText] = useState('Send message');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setIsSubmitting(true);
    setButtonText('Sending...'); 

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    try {
      const response = await fetch('https://formspree.io/f/movqkveo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setButtonText('Message Sent Successfully'); 
        setIsSubmitting(false);
        setEmail('');
        setMessage('');
      } else {
        setStatus('Error submitting message.');
        setButtonText('Send message');
        setIsSubmitting(false); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred!');
      setButtonText('Send message');
      setIsSubmitting(false); 
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1500, once: true }); // Initialize AOS with animation duration and scroll behavior
  }, []);

  return (
    <div 
      id="contact" 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">

        {/* Left Section - Heading */}
        <div 
          className="mb-8 md:mb-0 md:mr-12 text-center md:text-left"
          data-aos="fade-right"
        >
          <h3 className="text-pink-400 uppercase font-semibold mb-2">Get in Touch</h3>
          <h2 className="text-4xl font-bold mb-4">Let's work together!</h2>
        </div>

        {/* Right Section - Contact Form */}
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md bg-transparent border border-gray-500 p-6 rounded-lg"
          data-aos="fade-left"
        >
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full p-3 bg-transparent border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full p-3 bg-transparent border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              rows="4"
              className="w-full p-3 bg-transparent border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <span
              className={`transition-all duration-300 ${isSubmitting ? 'opacity-75' : 'opacity-100'}`}
            >
              {buttonText}
            </span>
          </button>
        </form>
      </div>

      {/* Status Message */}
      {status && (
        <div className="mt-4 text-center text-white" data-aos="fade-up">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
