
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { getUserProfile } from './services/api';
import './App.css';
import Hero from './components/Hero';
import Home from './components/Home';
import LandCalculator from './components/LandCalculator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Loader from './common/Loader';

function App() {


  const [userProfile, setUserProfile] = useState(null);
  const [userProfileError, setUserProfileError] = useState('');
  const [showLoader, setShowLoader] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      setShowLoader(true);

      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        setUserProfileError('');
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setUserProfileError(error.message);
      } finally {
        setShowLoader(false);
      }
    };

    const handleAuthChanged = () => {
      if (localStorage.getItem('farmrideToken')) {
        fetchProfile();
      } else {
        setUserProfile(null);
        setShowLoader(false);
      }
    };

    // Fetch profile when application loads
    handleAuthChanged();

    // Listen for login/logout and profile updates
    window.addEventListener('auth-changed', handleAuthChanged);
    window.addEventListener('profile-updated', handleAuthChanged);

    // Cleanup listeners
    return () => {
      window.removeEventListener('auth-changed', handleAuthChanged);
      window.removeEventListener('profile-updated', handleAuthChanged);
    };
  }, []);



  return (
    <BrowserRouter>

      <Navbar userProfile={userProfile} />

      <Routes>

        <Route
          path="/"
          element={

            <main>
              <Hero />
              <Home />
              <LandCalculator />

              <section id="how-it-works" className="simple-section">
                <h2>How FarmRide Works</h2>
                <p>Choose equipment, calculate your land, and book.</p>
              </section>

              <section id="about" className="simple-section">
                <h2>About FarmRide</h2>
                <p>Making agricultural equipment easier to access.</p>
              </section>



              <section id="equipment" className="equipment-section">
                <span className="section-label">OUR EQUIPMENT</span>
                <h2>Everything your farm needs</h2>
                <p>
                  From soil preparation to harvesting, find equipment
                  for every stage of your farming journey.
                </p>
              </section>

              <section id="how-it-works" className="simple-section">
                <h2>How FarmRide Works</h2>
                <p>Choose equipment, calculate your land, and book.</p>
              </section>

              <section id="about" className="simple-section">
                <h2>About FarmRide</h2>
                <p>Making agricultural equipment easier to access.</p>
              </section>

            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>


      {showLoader && (
        <div className="loader-overlay">
          <Loader message="Loading FarmRide..." />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;