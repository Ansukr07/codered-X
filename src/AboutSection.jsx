import React, { useRef, useEffect, useState, useMemo } from 'react';
import './AboutSection.css';

const CornerCluster = () => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gridSize = 35;

  useEffect(() => {
    const updateAlignment = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const absoluteY = rect.bottom + window.scrollY;
        
        const offsetY = absoluteY % gridSize;
        const shiftY = offsetY === 0 ? 0 : (gridSize - offsetY);
        
        setOffset({
          x: 0, 
          y: shiftY
        });
      }
    };

    updateAlignment();
    window.addEventListener('resize', updateAlignment);
    return () => window.removeEventListener('resize', updateAlignment);
  }, []);

  const boxes = useMemo(() => {
    // Opacity matrix mirroring the user's exact uploaded image
    // row 0 is bottom row, column 0 is far left
    const opacities = [
      /* y=0 */ [1.0, 1.0, 1.0, 0.7, 0.4, 0.2, 0.05],
      /* y=1 */ [1.0, 0.7, 0.4, 0.2, 0.1, 0,    0],
      /* y=2 */ [1.0, 0.4, 0.2, 0.1, 0,   0,    0],
      /* y=3 */ [0.7, 0.2, 0.1, 0,   0,   0,    0],
      /* y=4 */ [0.4, 0.1, 0,   0,   0,   0,    0],
      /* y=5 */ [0.2, 0.05,0,   0,   0,   0,    0],
      /* y=6 */ [0.1, 0,   0,   0,   0,   0,    0],
      /* y=7 */ [0.05,0,   0,   0,   0,   0,    0],
    ];

    const arr = [];
    for (let y = 0; y < opacities.length; y++) {
      for (let x = 0; x < opacities[y].length; x++) {
        const opacity = opacities[y][x];
        if (opacity > 0) {
          arr.push(
            <div
              key={`${x}-${y}`}
              className="cluster-solid-box"
              style={{
                width: gridSize,
                height: gridSize,
                bottom: y * gridSize,
                left: x * gridSize,
                backgroundColor: `rgba(217, 10, 22, ${opacity})`
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

const TopRightCluster = () => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gridSize = 35;

  useEffect(() => {
    const updateAlignment = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        
        const absoluteX = rect.right + window.scrollX;
        const absoluteY = rect.top + window.scrollY;
        
        const offsetX = absoluteX % gridSize;
        const offsetY = absoluteY % gridSize;
        
        // Shift RIGHT so the internal grid lines perfectly align, bleeding excess past the right edge
        const shiftX = offsetX === 0 ? 0 : (gridSize - offsetX);
        
        // Shift UP to crop excess past the top edge
        const shiftY = -offsetY;
        
        setOffset({
          x: shiftX,
          y: shiftY
        });
      }
    };

    updateAlignment();
    window.addEventListener('resize', updateAlignment);
    return () => window.removeEventListener('resize', updateAlignment);
  }, []);

  const boxes = useMemo(() => {
    // Opacity matrix mirroring the L-shape
    const opacities = [
      [1.0, 1.0, 1.0, 0.7, 0.4, 0.2, 0.05],
      [1.0, 0.7, 0.4, 0.2, 0.1, 0,    0],
      [1.0, 0.4, 0.2, 0.1, 0,   0,    0],
      [0.7, 0.2, 0.1, 0,   0,   0,    0],
      [0.4, 0.1, 0,   0,   0,   0,    0],
      [0.2, 0.05,0,   0,   0,   0,    0],
      [0.1, 0,   0,   0,   0,   0,    0],
      [0.05,0,   0,   0,   0,   0,    0],
    ];

    const arr = [];
    for (let y = 0; y < opacities.length; y++) {
      for (let x = 0; x < opacities[y].length; x++) {
        const opacity = opacities[y][x];
        if (opacity > 0) {
          arr.push(
            <div
              key={`tr-${x}-${y}`}
              className="cluster-solid-box"
              style={{
                width: gridSize,
                height: gridSize,
                top: y * gridSize,
                right: x * gridSize,
                backgroundColor: `rgba(217, 10, 22, ${opacity})`
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
      className="about-corner-cluster-top-right-wrapper"
    >
      <div 
        className="about-corner-cluster-top-right-track"
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
      <TopRightCluster />
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
