import React from 'react';
import './AboutSection.css';

const GridSweep = () => {
  const gridSize = 35;
  const cols = 15; // covers up to 525px
  const rows = 12; // covers up to 420px
  
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = c * 0.03 + Math.random() * 0.08;
      const opacity = 1.0; 
      blocks.push(
        <div
          key={`${r}-${c}`}
          className="grid-block"
          style={{
            top: r * gridSize,
            left: c * gridSize,
            width: gridSize,
            height: gridSize,
            transitionDelay: `${delay}s`,
            '--block-opacity': opacity,
          }}
        />
      );
    }
  }
  return <div className="card-grid-bg">{blocks}</div>;
};

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-header-container">
          <h2 className="about-heading">What is CODERED 4.0?</h2>
        </div>
        
        <p className="about-description">
          CODERED 4.0 is a National Level 24-hour Hackathon where builders, designers,<br />
          and makers come together to prototype bold ideas.
        </p>

        <div className="about-cards-container">
          {/* Card 1: Tracks */}
          <div className="about-card">
            <GridSweep />
            <div className="card-header">
              <h3>TRACKS</h3>
              <span className="plus-icon">+</span>
            </div>
            <div className="card-body">
              <p>Software</p>
              <p>Hardware</p>
            </div>
          </div>

          {/* Card 2: Prizes */}
          <div className="about-card">
            <GridSweep />
            <div className="card-header">
              <h3>PRIZES</h3>
              <span className="plus-icon">+</span>
            </div>
            <div className="card-body">
              <p>Overall Winner: ₹60,000</p>
              <p>Runner-up: ₹30,000</p>
              <p>Category Winners</p>
            </div>
          </div>

          {/* Card 3: Details */}
          <div className="about-card">
            <GridSweep />
            <div className="card-header">
              <h3>DETAILS</h3>
              <span className="plus-icon">+</span>
            </div>
            <div className="card-body">
              <p>Duration: 24 hours</p>
              <p>Team size: 3-4</p>
              <p>Venue: BMS Institute Of Technology & Management</p>
              <p>Date: Dec 12-13, 2025</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
