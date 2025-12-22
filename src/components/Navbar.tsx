import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useCards } from "../hooks/useCards";
import "../styles/navbar.css";

export const Navbar: React.FC = () => {
  const { isAuthenticated, isBusiness, isAdmin, logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cards } = useCards();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💼 BCard
        </Link>

        <div className="navbar-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link to="/favorites">❤️ Favorites</Link>
              </li>
              <li>
                <Link to="/my-cards">📇 My Cards</Link>
              </li>
              {isBusiness && (
                <li>
                  <Link to="/create-card">➕ Create Card</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/crm">⚙️ CRM</Link>
                </li>
              )}
              <li>
                <Link to="/profile">👤 Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="logout-btn">
                  🚪 Logout
                </button>
              </li>
            </>
          )}

          <li>
            <Link to="/about">ℹ️ About</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-container">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="search-icon"
              title="Search"
            >
              🔍
            </button>
            {showSearch && (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {filteredCards.length > 0 && (
                  <div className="search-results">
                    {filteredCards.slice(0, 5).map((card) => (
                      <Link
                        key={card._id}
                        to={`/card/${card._id}`}
                        className="search-result-item"
                        onClick={() => setShowSearch(false)}
                      >
                        {card.title}
                      </Link>
                    ))}
                  </div>
                )}
              </form>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title="Toggle dark mode"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {isAuthenticated && user && (
            <span className="user-info">{user.email}</span>
          )}
        </div>
      </div>
    </nav>
  );
};
