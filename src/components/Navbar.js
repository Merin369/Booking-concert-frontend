import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark animated-navbar">
      <div className="container">
        <Link className="navbar-brand animated-brand" to="/">
          Concert Booking
        </Link>

        {/* ✅ Animated Toggle Button */}
        <button
          className="navbar-toggler animated-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <Link className="nav-link animated-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link animated-link" to="/concerts">
                 Concerts
              </Link>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link animated-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link animated-link" to="/login">
                     Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link animated-link" to="/dashboard">
                      ⚙️ Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn logout-btn animated-btn" onClick={handleLogout}>
                     Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
