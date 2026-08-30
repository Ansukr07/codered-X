import React from 'react';
import './AboutSection.css';

const GridSweep = () => {
  const gridSize = 35;
  const cols = 15;
  const rows = 12;
  
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = c * 0.03 + Math.random() * 0.08;
      blocks.push(
        <div
          key={`${r}-${c}`}
          className="grid-block"
          style={{
            top: r * gridSize,
            left: c * gridSize,
            width: gridSize + 1.5,
            height: gridSize + 1.5,
            transitionDelay: `${delay}s`,
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
          <div className="heading-group">
            <span className="heading-cursive">What is</span>
            <h2 className="about-heading">CODERED 4.0?</h2>
          </div>
        </div>
        
        <p className="about-description">
          A 24-hour crucible of innovation where builders, designers, and makers converge to redefine the future of technology. This is your arena to turn bold ideas into reality.
        </p>

        <div className="about-cards-container">
          
          {/* Card 1 */}
          <div className="about-card-rhombus">
            <GridSweep />
            <div className="rhombus-content">
              <div className="card-header">
                <h3>TRACKS</h3>
              </div>
              <div className="card-body">
                <p>Software</p>
                <p>Hardware</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="about-card-rhombus">
            <GridSweep />
            <div className="rhombus-content">
              <div className="card-header">
                <h3>PRIZES</h3>
              </div>
              <div className="card-body">
                <p>Overall Winner: ₹60,000</p>
                <p>Runner-up: ₹30,000</p>
                <p>Category Winners</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="about-card-rhombus">
            <GridSweep />
            <div className="rhombus-content">
              <div className="card-header">
                <h3>DETAILS</h3>
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

      </div>
    </section>
  );
};

export default AboutSection;
