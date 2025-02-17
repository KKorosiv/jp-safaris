import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/register", formData);
      const user = response.data.user;

    
      login(user);

      navigate("/login");
      alert("Registration successful. Please log in.");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
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
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Register
        </button>


        <div className="flex justify-center items-center mt-4">
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
