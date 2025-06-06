import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Import external CSS

const Dashboard = () => {
  const [concerts, setConcerts] = useState([]);
  const [newConcert, setNewConcert] = useState({
    name: "",
    location: "",
    price: "",
    date: "",
    venue: "",
    time: "",
    availableTickets: "",
  });
  const [editingConcert, setEditingConcert] = useState(null);
  const navigate = useNavigate(); // Initialize navigation
  const token = localStorage.getItem("token");

  // Fetch all concerts
  const fetchConcerts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/concerts");
      setConcerts(response.data);
    } catch (error) {
      console.error("Error fetching concerts:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setNewConcert({ ...newConcert, [e.target.name]: e.target.value });
  };

  // Add or Update Concert
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingConcert) {
        await axios.put(`http://localhost:8000/api/concerts/${editingConcert._id}`, newConcert, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8000/api/concerts", newConcert, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchConcerts();
      setNewConcert({ name: "", location: "", price: "", date: "", venue: "", time: "", availableTickets: "" });
      setEditingConcert(null);
    } catch (error) {
      console.error("Error saving concert:", error.response?.data || error);
    }
  };

  // Edit Concert
  const handleEditConcert = (concert) => {
    setEditingConcert(concert);
    setNewConcert(concert);
  };

  // Delete Concert
  const handleDeleteConcert = async (id) => {
    if (!window.confirm("Are you sure you want to delete this concert?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/concerts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchConcerts();
    } catch (error) {
      console.error("Error deleting concert:", error.response?.data || error);
    }
  };

  return (
    <div className="container dashboard-container">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>

      {/* Booking Details Button */}
      <div className="text-center mb-4">
        <button className="btn btn-info px-4" onClick={() => navigate("/booking-details")}>
          Booking Details
        </button>
      </div>

      {/* Concert Form */}
      <div className="card shadow p-4 mt-4">
        <h4 className="text-center">{editingConcert ? "Edit Concert" : "Add Concert"}</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" name="name" placeholder="Concert Name" value={newConcert.name} onChange={handleInputChange} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" name="location" placeholder="Location" value={newConcert.location} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" name="price" placeholder="Price" value={newConcert.price} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="date" className="form-control" name="date" value={newConcert.date} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" name="venue" placeholder="Venue" value={newConcert.venue} onChange={handleInputChange} required />
          </div>
          <div className="col-md-6">
            <input type="time" className="form-control" name="time" value={newConcert.time} onChange={handleInputChange} required />
          </div>
          <div className="col-md-6">
            <input type="number" className="form-control" name="availableTickets" placeholder="Available Tickets" value={newConcert.availableTickets} onChange={handleInputChange} required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success px-4">{editingConcert ? "Update Concert" : "Add Concert"}</button>
          </div>
        </form>
      </div>

      {/* Concert List */}
      <h3 className="text-center mt-5">All Concerts</h3>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Time</th>
              <th>Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {concerts.length > 0 ? (
              concerts.map((concert) => (
                <tr key={concert._id} className="text-center">
                  <td>{concert.name}</td>
                  <td>{concert.location}</td>
                  <td>${concert.price}</td>
                  <td>{new Date(concert.date).toLocaleDateString()}</td>
                  <td>{concert.venue}</td>
                  <td>{concert.time}</td>
                  <td>{concert.availableTickets}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditConcert(concert)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteConcert(concert._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">No concerts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
