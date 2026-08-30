import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-header">
        <div className="nav-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="5" height="5" fill="white" />
            <rect x="2" y="9" width="5" height="5" fill="white" />
            <rect x="2" y="16" width="5" height="5" fill="white" />
            <rect x="9" y="16" width="5" height="5" fill="white" />
            <rect x="16" y="16" width="5" height="5" fill="white" />
            <rect x="16" y="9" width="5" height="5" fill="white" />
          </svg>
        </div>
        
        <div className="nav-title">CODERED 4.0</div>
        
        <button className="nav-toggle" onClick={toggleMenu}>
          <div className="toggle-line"></div>
          {!isOpen && <div className="toggle-line"></div>}
        </button>
      </div>

      <div className={`navbar-dropdown ${isOpen ? 'show' : ''}`}>
        <ul className="nav-menu-list">
          <li className="nav-menu-item">
            <span>Home</span>
          </li>
          <li className="nav-menu-item">
            <span>Prizes</span>
            <svg className="menu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="6" y="2" width="3" height="3" fill="white" />
              <rect x="6" y="6" width="3" height="3" fill="white" />
              <rect x="6" y="10" width="3" height="3" fill="white" />
              <rect x="2" y="6" width="3" height="3" fill="white" />
              <rect x="10" y="6" width="3" height="3" fill="white" />
            </svg>
          </li>
          <li className="nav-menu-item">
            <span>Problem statements</span>
          </li>
          <li className="nav-menu-item">
            <span>Sponsors</span>
            <svg className="menu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="10" y="2" width="3" height="3" fill="white" />
              <rect x="6" y="2" width="3" height="3" fill="white" />
              <rect x="10" y="6" width="3" height="3" fill="white" />
              <rect x="2" y="10" width="3" height="3" fill="white" />
            </svg>
          </li>
          <li className="nav-menu-item">
            <span>FAQ</span>
          </li>
        </ul>

        <div className="nav-footer">
          <button className="nav-btn-pitchdeck">PPT TEMPLATE</button>
          <div className="nav-footer-row">
            <button className="nav-btn-action">REGISTER NOW</button>
            <button className="nav-btn-action">BROCHURE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
