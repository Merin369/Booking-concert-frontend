import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, cancelBooking } from "../redux/bookingSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingDetails.css"; // Custom styling

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings()); // Fetch bookings when component mounts
  }, [dispatch]);

  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(bookingId));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 animated-title">🎟️ User Bookings</h2>

      {status === "loading" && <p className="text-center">Loading bookings...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking, index) => (
            <div key={booking._id} className="col-md-4">
              <div className="card booking-card">
                <div className="card-body">
                  <h5 className="card-title">🎫 {booking.username}</h5>
                  <p className="card-text">
                    <strong>Tickets:</strong> {booking.tickets}
                  </p>
                  <p className="card-text">
                    <strong>Booking Date:</strong> {booking.bookingDate}
                  </p>
                  <button
                    className="btn btn-danger cancel-btn"
                    onClick={() => handleCancel(booking._id)}
                  >
                    ❌ Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center no-bookings">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingDetails;
