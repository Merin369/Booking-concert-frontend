import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentPage.css"; // Custom CSS file

const PaymentPage = () => {
  const { concertId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to book a concert.");
      return;
    }

    if (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
      setError("Please fill in all card details.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/concerts/book/${concertId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketQuantity, cardDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful!");
        navigate(`/qr/${concertId}/${ticketQuantity}`);
      } else {
        setError(data.error || "Booking failed.");
      }
    } catch (err) {
      setError("Error processing booking.");
    }
  };

  const handleCardInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-container d-flex align-items-center justify-content-center">
      <div className="payment-box">
        <h2 className="text-center">Payment Page</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {message && <p className="text-success text-center">{message}</p>}

        {/* Ticket Selection */}
        <div className="form-group">
          <label className="fw-bold">Tickets:</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="3"
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(Number(e.target.value))}
          />
          <p className="mt-2"><strong>Total Amount:</strong> ${ticketQuantity * 50}</p> {/* Assuming ticket price is $50 */}
        </div>

        {/* Card Payment Section */}
        <div className="card-section">
          <h4 className="text-center">Enter Card Details</h4>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Cardholder Name"
            value={cardDetails.name}
            onChange={handleCardInputChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            className="form-control mb-2"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleCardInputChange}
            maxLength="16"
            required
          />
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="expiry"
                className="form-control mb-2"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardInputChange}
                maxLength="5"
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="cvv"
                className="form-control mb-2"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                maxLength="3"
                required
              />
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button className="btn btn-success w-100 mt-3" onClick={handlePayment}>
          Pay & Book
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
