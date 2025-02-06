import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiUsers, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { FaSuitcaseRolling } from "react-icons/fa";

const Sidebar = () => (
  <aside className="w-64 bg-gray-900 text-white h-screen p-4">
    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
    <ul className="space-y-4">
      <li className="p-2 hover:bg-gray-700 cursor-pointer">Overview</li>
      <li className="p-2 hover:bg-gray-700 cursor-pointer">Tours</li>
      <li className="p-2 hover:bg-gray-700 cursor-pointer">Bookings</li>
      <li className="p-2 hover:bg-gray-700 cursor-pointer">Analytics</li>
    </ul>
  </aside>
);

const Dashboard = () => {
  const tourData = [
    { name: "Jan", bookings: 30 },
    { name: "Feb", bookings: 45 },
    { name: "Mar", bookings: 60 },
    { name: "Apr", bookings: 80 },
    { name: "May", bookings: 55 },
    { name: "Jun", bookings: 90 },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FiUsers className="text-blue-500 text-4xl" />
            <div>
              <p className="text-xl font-bold">1,200</p>
              <p className="text-gray-500">Total Users</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FiCalendar className="text-green-500 text-4xl" />
            <div>
              <p className="text-xl font-bold">350</p>
              <p className="text-gray-500">Total Bookings</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaSuitcaseRolling className="text-yellow-500 text-4xl" />
            <div>
              <p className="text-xl font-bold">25</p>
              <p className="text-gray-500">Active Tours</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FiTrendingUp className="text-red-500 text-4xl" />
            <div>
              <p className="text-xl font-bold">$45,000</p>
              <p className="text-gray-500">Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tourData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
