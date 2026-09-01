import React, { useRef, useEffect, useState } from 'react';
import './AboutSection.css';

const CornerCluster = () => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gridSize = 35;
  const radius = 12; // 12 boxes = 420px radius

  useEffect(() => {
    const updateAlignment = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const absoluteY = rect.bottom + window.scrollY;
        const absoluteX = rect.left + window.scrollX;
        
        const offsetY = absoluteY % gridSize;
        const offsetX = absoluteX % gridSize;
        
        setOffset({
          x: -offsetX,
          y: -offsetY
        });
      }
    };

    updateAlignment();
    window.addEventListener('resize', updateAlignment);
    return () => window.removeEventListener('resize', updateAlignment);
  }, []);

  const boxes = useMemo(() => {
    const arr = [];
    for (let y = 0; y <= radius; y++) {
      for (let x = 0; x <= radius; x++) {
        // If distance from bottom-left corner (0,0) is within radius, fill it!
        if (x * x + y * y <= radius * radius) {
          arr.push(
            <div
              key={`${x}-${y}`}
              className="cluster-solid-box"
              style={{
                width: gridSize,
                height: gridSize,
                bottom: y * gridSize,
                left: x * gridSize,
              }}
            />
          );
        }
      }
    }
    return arr;
  }, []);

  return (
    <div 
      ref={containerRef}
      className="about-corner-cluster-wrapper"
    >
      <div 
        className="about-corner-cluster-track"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {boxes}
      </div>
    </div>
  );
};

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
      <CornerCluster />
      <div className="about-content">
        
        <div className="about-left">
          <div className="about-header-container">
            <div className="heading-group">
              <span className="heading-cursive">What is</span>
              <h2 className="about-heading">CODERED <span style={{color: '#D90A16'}}>4.0</span>?</h2>
            </div>
          </div>
          
          <p className="about-description">
            A 24-hour crucible of innovation where builders, designers, and makers converge to redefine the future of technology. This is your arena to turn bold ideas into reality.
          </p>

          <div className="about-details-list">
            <div className="detail-item">
              <span className="detail-label">Duration:</span> 24 hours
            </div>
            <div className="detail-item">
              <span className="detail-label">Team size:</span> 3-4
            </div>
            <div className="detail-item">
              <span className="detail-label">Venue:</span> BMS Institute Of Technology & Management
            </div>
            <div className="detail-item">
              <span className="detail-label">Date:</span> Dec 12-13, 2025
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-cards-container">
          
          {/* Card 1 */}
          <div className="card-row">
            <h3 className="card-outside-title">Tracks</h3>
            <div className="about-card-rhombus">
              <GridSweep />
              <div className="rhombus-content">
                <div className="card-body">
                  <p>Software</p>
                  <p>Hardware</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-row">
            <h3 className="card-outside-title">Prizes</h3>
            <div className="about-card-rhombus">
              <GridSweep />
              <div className="rhombus-content">
                <div className="card-body">
                  <p>Overall Winner: ₹60,000</p>
                  <p>Runner-up: ₹30,000</p>
                  <p>Category Winners</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
