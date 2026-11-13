
import { useState } from 'react';
import { Tractor, Menu, UserRound, ChevronDown, LogOut, User, Phone, Mail, UserRoundArrowLeft, ChevronUp } from 'lucide-react';
import '../style/Nacbar.css';

function Navbar({ userProfile }) {


  const [showProfile, setShowProfile] = useState(false);
  const isLoggedIn = Boolean(userProfile);


  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('farmrideToken');
    window.location.href = '/login';
  };

  return (
    <header className="navbar">
      <a href="/" className="navbar-brand">
        <span className="brand-icon">
          <img className="brand-icon" src="/public/icons8-tractor (1).svg" alt="Tractor" />
        </span>
        <span>
          Farm<span className="brand-highlight">Ride</span> <span className="brand-country">IN</span>
        </span>
      </a>

      <nav className="navbar-links">
        <a className="active" href="/">Home</a>
        <a href="#equipment">Equipment</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#about">About Us</a>
      </nav>

      <div className="navbar-actions">


        {isLoggedIn ? (
          <div className="profile-container">
            <button
              className="profile-btn"
              type="button"
              onClick={() => setShowProfile(!showProfile)}
            >
              <UserRound size={15} />
              <span>{userProfile.fullName}</span>
             {showProfile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showProfile && (
              <div className="profile-dropdown">

                <div className="profile-header">
                  <div className="profile-avatar">
                    {userProfile.fullName
                      ?.split(' ')
                      .map(word => word[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div className="profile-user-info">
                    <h3>{userProfile.fullName}</h3>
                    <span>{userProfile.role}</span>
                  </div>
                </div>

                <div className="profile-contact">
                  <div>
                    <Phone size={18} />
                    <span>
                      +91 {userProfile.mobileNumber || 'Not provided'}</span>
                  </div>

                  <div>
                    <Mail size={18} />
                    <span>{userProfile.email || 'Not provided'}</span>
                  </div>
                </div>

                <div className="profile-footer">
                  <button
                    type="button"
                    className="manage-account"
                    onClick={() => {
                      setShowProfile(false);
                      window.location.href = '/profile';
                    }}
                  >
                    Manage Account <UserRoundArrowLeft  className='sign-out-icon' size={18} />
                  </button>

                  <button
                    type="button"
                    className="sign-out"
                    onClick={handleLogout}
                  >
                    Sign Out <LogOut className='sign-out-icon' size={18} />
                  </button>
                </div>

              </div>
            )}
          </div>
        )  : (
          <>
            <button
              className="login-btn"
              type="button"
              onClick={handleLoginClick}
            >
              <UserRound size={17} />
              Login
            </button>

            <button className="primary-btn" type="button">
              Get Started
            </button>
          </>
        )}


        {/* Remove redundant login and get started buttons */}
      </div>

      <button className="mobile-menu" type="button" aria-label="Open menu"> Hello
        <Menu size={24} />
      </button>
    </header>
  );
}

export default Navbar;