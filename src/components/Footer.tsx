import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";

export const Footer: React.FC = () => {
  const { isAuthenticated, isBusiness, isAdmin } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>BCard</h3>
          <p>Professional business card management platform</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                  <Link to="/my-cards">My Cards</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="footer-section">
          {!isAuthenticated ? (
            <>
              <h4>Account</h4>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h4>Business</h4>
              <ul>
                {isBusiness && (
                  <li>
                    <Link to="/create-card">Create Card</Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link to="/crm">CRM System</Link>
                  </li>
                )}
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@bcard.com</p>
          <p>Phone: +97239504019</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 BCard Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};
