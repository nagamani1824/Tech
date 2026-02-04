import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setMenuOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/ab' },
    { text: 'Services', path: '/call' },
    { text: 'About Tech', path: '/f' },
    { text: 'Admin', path: '/Ad' }
  ];

  return (
    <nav className={`nav sticky-top ${menuOpen ? 'open' : ''}`}>
      <Link to="/" className="logo-link animate-fade-in">
        <span className="text-logo">🖥️ Tech</span>
      </Link>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <form className="search-form animate-slide-in" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="search-icon">🔍</i>
          <span>Search</span>
        </button>
      </form>

      <ul className="nav-links">
        {navLinks.map((link, index) => (
          <li key={link.text} style={{animationDelay: `${index * 0.1}s`}}>
            <Link 
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="animate-link"
            >
              {link.text}
            </Link>
            
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;







