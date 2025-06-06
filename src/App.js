import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ConcertList from "./components/ConcertList";
import QRCodePage from "./components/QRCodePage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard"; // Admin Dashboard
import PaymentPage from "./components/PaymentPage";
import Home from "./components/Home"; // Import Home Page
import BookingDetails from "./components/BookingDetails";
import ProtectedRoute from "./auth/ProtectedRoute"; // Import Protected Route

function App() {
  return (
    <Router>
      <Navbar />
      <div>
       
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/concerts" element={<ConcertList />} />
  <Route path="/qr/:concertId/:ticketQuantity" element={<QRCodePage />} />

  {/* 🔒 Protect Payment Page & Booking Details */}
  <Route element={<ProtectedRoute />}>
    <Route path="/payment/:concertId" element={<PaymentPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/booking-details" element={<BookingDetails />} />
  </Route>
</Routes>

      </div>
    </Router>
  );
}

export default App;
