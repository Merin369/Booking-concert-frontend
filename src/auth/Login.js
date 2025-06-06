import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import Redux dispatch
import { login } from "../redux/authSlice"; // Import login action
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function

  const adminLogoURL = "https://admin.infoworld.org.in/images/img2.png";
  const userLogoURL = "https://tse3.mm.bing.net/th/id/OIP.e1KNYwnuhNwNj7_-98yTRwHaF7?rs=1&pid=ImgDetMain";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isAdmin
        ? "http://localhost:8000/api/admin/login"
        : "http://localhost:8000/api/login";

      const credentials = isAdmin
        ? { username: email, password }
        : { email, password };

      const response = await axios.post(endpoint, credentials);
      const token = response.data.token;
      const user = { email, role: isAdmin ? "admin" : "user" };

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Store in Redux
      dispatch(login({ token, user }));

      // Redirect based on role
      isAdmin ? navigate("/dashboard") : navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="admin-section"></div>
      <div className="login-box">
        <div className="logo-container" onClick={() => setIsAdmin(!isAdmin)}>
          <img src={isAdmin ? adminLogoURL : userLogoURL} alt="Switch Login" className="login-logo" />
        </div>

        <h2>{isAdmin ? "Admin Login" : "User  Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder={isAdmin ? "Admin Username" : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;