// pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to FixiGo</h1>
        <button onClick={handleLoginClick} className="login-button">
          Go to Login
        </button>
      </header>
      <footer className="footer">
        <p>&copy; 2024 FixiGo. All rights reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/facebook-logo.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/twitter-logo.png" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/instagram-logo.png" alt="Instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
