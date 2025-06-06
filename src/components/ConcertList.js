import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConcertList.css"; // Custom styles

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/concerts");
        const data = await response.json();
        if (response.ok) {
          setConcerts(data);
        } else {
          setError(data.error || "Failed to fetch concerts.");
        }
      } catch (err) {
        setError("Error fetching concerts.");
      }
    };
    fetchConcerts();
  }, []);

  // Handle "Book Now" click
  const handleBook = (concertId) => {
    if (isAuthenticated) {
      navigate(`/payment/${concertId}`); // Navigate to payment
    } else {
      navigate("/login"); // Redirect to login
    }
  };

  return (
    <div className="concert-list-container">
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-white">Upcoming Concerts</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          {concerts.length === 0 ? (
            <p className="text-center text-white">Loading concerts...</p>
          ) : (
            concerts.map((concert) => (
              <div key={concert._id} className="col-md-4">
                <div className="card concert-card">
                  <img
                    src={concert.image || "https://images.template.net/4999/Concert-Event-Poster-Template-2.jpg"}
                    alt={concert.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{concert.name}</h5>
                    <p><strong>Date:</strong> {concert.date}</p>
                    <p><strong>Time:</strong> {concert.time}</p>
                    <p><strong>Place:</strong> {concert.location}</p>
                    <p><strong>Tickets Left:</strong> {concert.availableTickets}</p>
                    <p><strong>Price:</strong> ${concert.price}</p>

                    {/* "Book Now" Button with Authentication Check */}
                    <button className="btn btn-primary w-100" onClick={() => handleBook(concert._id)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcertList;
