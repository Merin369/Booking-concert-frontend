import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap
import "./QRCodePage.css"; // ✅ Import custom CSS

const QRCodePage = () => {
  const { concertId, ticketQuantity } = useParams();
  const [concert, setConcert] = useState(null);
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/qr/${concertId}/${ticketQuantity}`
        );
        setConcert(response.data.concert);
        setQrData(
          `Concert: ${response.data.concert.name}, Tickets: ${ticketQuantity}, Price: $${response.data.concert.price * ticketQuantity}`
        );
      } catch (err) {
        setError("Error generating QR code");
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, [concertId, ticketQuantity]);

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/qr/pdf/${concertId}/${ticketQuantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket_${concertId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Error downloading ticket PDF");
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="qr-container">
      <div className="qr-box">
        <h2 className="text-center">🎟️ Your QR Code</h2>
        {concert && (
          <div className="text-center">
            <h4>{concert.name}</h4>
            <p><strong>Tickets:</strong> {ticketQuantity}</p>
            <p><strong>Total Price:</strong> ${concert.price * ticketQuantity}</p>
          </div>
        )}
        {qrData ? (
          <>
            <div className="qr-code">
              <QRCodeCanvas value={qrData} size={200} />
            </div>
            <button className="btn btn-primary mt-3 w-100" onClick={handleDownloadPDF}>
              📥 Download PDF Ticket
            </button>
          </>
        ) : (
          <p className="text-center">Generating QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default QRCodePage;
