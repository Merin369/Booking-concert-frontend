import React from "react";
import "./Home.css";
import { FaShoppingCart } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-overlay">
        {/* Main Container */}
        <div className="container text-center text-white">

          {/* Hero Section */}
          <header className="hero-text animate-fadeIn py-4">
            <h1 className="fw-bold">Experience the Best Events!</h1>
            <p>Book your tickets now and enjoy live music like never before.</p>
          </header>

          {/* Blinking Note */}
          <section className="special-note text-warning mb-4">
            <p>🎉 Limited Tickets Available! Book Now Before It's Too Late! 🎟️</p>
          </section>

          {/* Upcoming Events */}
          <section className="py-4">
            <h2 className="animate-slideIn mb-4">Upcoming Events</h2>
            <div className="row justify-content-center">
              {/* Concert 1 */}
              <div className="col-sm-10 col-md-6 col-lg-4 mb-4">
                <div className="card concert-card animate-zoomIn">
                  <img
                    src="https://images.pexels.com/photos/8512439/pexels-photo-8512439.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="card-img-top"
                    alt="Rock & Roll Night"
                  />
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title text-warning">Rock & Roll Night</h5>
                    <p className="card-text">Feel the adrenaline rush with top rock bands.</p>
                  </div>
                </div>
              </div>

              {/* Concert 2 */}
              <div className="col-sm-10 col-md-6 col-lg-4 mb-4">
                <div className="card concert-card animate-zoomIn">
                  <img
                    src="https://images.pexels.com/photos/8128014/pexels-photo-8128014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="card-img-top"
                    alt="Jazz & Blues Festival"
                  />
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title text-warning">Jazz & Blues Festival</h5>
                    <p className="card-text">Experience the soulful vibes of jazz and blues.</p>
                  </div>
                </div>
              </div>

              {/* Concert 3 */}
              <div className="col-sm-10 col-md-6 col-lg-4 mb-4">
                <div className="card concert-card animate-zoomIn">
                  <img
                    src="https://images.pexels.com/photos/30640569/pexels-photo-30640569/free-photo-of-dj-performing-in-a-vibrant-club-night-scene.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="card-img-top"
                    alt="Pop Extravaganza"
                  />
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title text-warning">Pop Extravaganza</h5>
                    <p className="card-text">Join the biggest pop music event of the year.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Info */}
          <section className="py-4 animate-fadeIn">
            <h2 className="mb-2">Easy & Secure Booking</h2>
            <p className="mb-3">Get your tickets in just a few clicks. Enjoy hassle-free payments and instant confirmations.</p>
            <FaShoppingCart className="cart-icon" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
