import React from "react";
import "./Home.css";
import { FaShoppingCart, FaMusic, FaLock, FaUsers, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-overlay">
        <div className="container text-white py-5">

          {/* Hero Section */}
          <header className="hero-text animate-fadeIn text-center mb-5">
            <h1 className="fw-bold">Experience the Best Live Events</h1>
            <p>Book your tickets now and immerse yourself in unforgettable concerts, festivals, and performances.</p>
            <p className="special-note text-warning mt-3">🎉 Limited Tickets Available! Book Now! 🎟️</p>
          </header>

          {/* Upcoming Events */}
          <section className="mb-5">
            <h2 className="animate-slideIn text-center mb-4">Upcoming Events</h2>
            <div className="row justify-content-center">
              {/* Sample Cards */}
              {[{
                title: "Rock & Roll Night",
                img: "https://images.pexels.com/photos/8512439/pexels-photo-8512439.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Feel the adrenaline rush with top rock bands."
              }, {
                title: "Jazz & Blues Festival",
                img: "https://images.pexels.com/photos/8128014/pexels-photo-8128014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                desc: "Experience the soulful vibes of jazz and blues."
              }, {
                title: "Pop Extravaganza",
                img: "https://images.pexels.com/photos/30640569/pexels-photo-30640569/free-photo-of-dj-performing-in-a-vibrant-club-night-scene.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Join the biggest pop music event of the year."
              }].map((event, i) => (
                <div key={i} className="col-sm-10 col-md-6 col-lg-4 mb-4">
                  <div className="card concert-card animate-zoomIn">
                    <img src={event.img} className="card-img-top" alt={event.title} />
                    <div className="card-body bg-dark text-white">
                      <h5 className="card-title text-warning">{event.title}</h5>
                      <p className="card-text">{event.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="text-center animate-fadeIn mb-5">
            <h2>About Us</h2>
            <p className="mx-auto" style={{ maxWidth: "800px" }}>
              We are a premier concert booking platform designed to connect music lovers with their favorite artists and events. Whether it's rock, pop, jazz, or EDM, we've got something for everyone. Our goal is to create a seamless and secure booking experience.
            </p>
          </section>

          {/* How It Works */}
          <section className="text-center animate-slideIn mb-5">
            <h2>How It Works</h2>
            <div className="row mt-4">
              {[
                { icon: <FaUsers />, text: "Create Your Account" },
                { icon: <FaMusic />, text: "Browse & Choose Events" },
                { icon: <FaLock />, text: "Securely Book Your Tickets" },
              ].map((step, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className="p-3 border rounded bg-dark h-100">
                    <div className="mb-2 fs-1 text-warning">{step.icon}</div>
                    <h5>{step.text}</h5>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="text-center animate-fadeIn mb-5">
            <h2>What Our Customers Say</h2>
            <div className="row mt-4">
              {[
                { name: "Alex", review: "A seamless booking experience with great customer support!" },
                { name: "Priya", review: "Loved the concert. The platform was super easy to use!" },
                { name: "John", review: "Fast, reliable, and secure ticketing. Highly recommend!" }
              ].map((t, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className="p-3 bg-dark text-white rounded shadow">
                    <p className="mb-1">“{t.review}”</p>
                    <small className="text-warning">— {t.name}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-light pt-4 border-top border-secondary mt-5">
            <p><FaPhoneAlt /> +91 98765 43210 | <FaEnvelope /> support@concertbooker.com</p>
            <p className="text-muted small">© 2025 Concert Booker. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Home;
