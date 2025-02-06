import React, { useState } from "react";
import { useAuth } from "./AuthContext"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve saved user details from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      login(savedUser); // Login the user

      // ✅ Redirect based on role
      if (savedUser.role === "admin") {
        navigate("/admin"); // Redirect admin to admin dashboard
      } else {
        navigate("/book"); // Regular user goes to booking page
      }
    } else {
      alert("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="border p-2 w-full mb-2"
        />
        <input 
          type="password" 
          name="password" 
          onChange={handleChange} 
          required 
          className="border p-2 w-full mb-2"
          placeholder="Password" 
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-600">
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>Don't have an account? 
          <span 
            className="text-blue-500 cursor-pointer font-semibold ml-1 hover:underline"
            onClick={() => navigate("/register")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
