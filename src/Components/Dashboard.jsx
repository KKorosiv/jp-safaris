import React, { useState } from "react";
import { FiUsers, FiCalendar, FiTrendingUp, FiPlusCircle, FiTrash } from "react-icons/fi";
import { FaSuitcaseRolling } from "react-icons/fa";

const Sidebar = ({ setActiveTab }) => (
  <aside className="w-64 bg-gray-900 text-white h-screen p-4">
    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
    <ul className="space-y-4">
      <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveTab("overview")}>Overview</li>
      <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveTab("manageTours")}>Manage Tours</li>
      <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => setActiveTab("bookings")}>Bookings</li>
    </ul>
  </aside>
);

const Overview = () => (
  <div>
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
  </div>
);

const Bookings = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Bookings</h1>
    <p>Here, you can manage and verify tour bookings.</p>
  </div>
);

const ManageTours = () => {
  const [tours, setTours] = useState([
    { id: 1, name: "Safari Adventure", fee: "150", category: "Wildlife", status: "Active", image: "" },
    { id: 2, name: "Mountain Hiking", fee: "200", category: "Hiking", status: "Upcoming", image: "" },
  ]);
  const [newTour, setNewTour] = useState({ name: "", fee: "", category: "", status: "Upcoming", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTour({ ...newTour, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTour = () => {
    if (!newTour.name.trim() || !newTour.fee.trim() || !newTour.category.trim()) return;
    setTours((prevTours) => [...prevTours, { ...newTour, id: Date.now() }]);
    setNewTour({ name: "", fee: "", category: "", status: "Upcoming", image: "" });
  };

  const deleteTour = (id) => {
    setTours((prevTours) => prevTours.filter(tour => tour.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Tours</h1>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <input type="text" name="name" placeholder="Tour Name" className="p-2 border rounded-md w-full" value={newTour.name} onChange={handleChange} />
        <input type="text" name="fee" placeholder="Fee (USD)" className="p-2 border rounded-md w-full" value={newTour.fee} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" className="p-2 border rounded-md w-full" value={newTour.category} onChange={handleChange} />
        <select name="status" className="p-2 border rounded-md w-full" value={newTour.status} onChange={handleChange}>
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <input type="file" accept="image/*" className="p-2 border rounded-md" onChange={handleImageChange} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center" onClick={addTour}>
          <FiPlusCircle className="mr-2" /> Add Tour
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Tour Name</th>
            <th className="p-3 text-left">Fee (USD)</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="border-b">
              <td className="p-3">{tour.name}</td>
              <td className="p-3">${tour.fee}</td>
              <td className="p-3">{tour.category}</td>
              <td className="p-3">{tour.status}</td>
              <td className="p-3">{tour.image && <img src={tour.image} alt={tour.name} className="h-12 w-12 rounded-md" />}</td>
              <td className="p-3 flex space-x-2">
                <button className="text-red-500" onClick={() => deleteTour(tour.id)}><FiTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 bg-gray-100">
        {activeTab === "overview" && <Overview />}
        {activeTab === "manageTours" && <ManageTours />}
        {activeTab === "bookings" && <Bookings />}
      </main>
    </div>
  );
};

export default Dashboard;
