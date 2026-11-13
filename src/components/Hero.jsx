
import heroImg from '../assets/hero.png';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">
          🌱 Smart Farming Starts Here...
        </span>

        <h1>
          The right tractor.
          <br />
          <span>Right when you need it.</span>
        </h1>

        <p>
          Book tractors and farming equipment near you.
          Calculate your land area and estimate your farming
          costs in just a few clicks.
        </p>

        <div className="hero-actions">
          <a href="#equipment" className="hero-primary">
            Explore Equipment <span>→</span>
          </a>

          <a href="#land-calculator" className="hero-secondary">
            Calculate Land Area
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>Easy</strong>
            <span>Equipment Booking</span>
          </div>

          <div>
            <strong>Smart</strong>
            <span>Land Calculation</span>
          </div>

          <div>
            <strong>Simple</strong>
            <span>Price Estimation</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wZSn5YHkho7vJClPZArjxzEqTkQgJXG8roIpHqMMxQ&s=10" alt="FarmRide agricultural equipment" />

        <div className="hero-floating-card">
          <span className="floating-icon">🌾</span>
          <div>
            <strong>Ready for your next harvest?</strong>
            <p>Find equipment for your farm.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;