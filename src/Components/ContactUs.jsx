import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "254746454686";
    const message = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank').focus();
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Contact Us</h2>

      <form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
        <p>Email: <a href="mailto:info@jpsafaris.com" className="text-green-500 hover:underline">info@jpsafaris.com</a></p>
        <p>Phone: <a href="tel:+254722831876" className="text-green-500 hover:underline">+254722831876</a></p>
        <p>Address: <a href="https://www.google.com/maps/search/?api=1&query=123+Safari+Way,+Nairobi,+Kenya" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">123 Safari Way, Nairobi, Kenya</a></p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-blue-600">
            <FaFacebook size={32} />
          </a>
          <a href="https://twitter.com" className="text-green-400">
            <FaTwitter size={32} />
          </a>
          <a href="https://instagram.com" className="text-pink-600">
            <FaInstagram size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
