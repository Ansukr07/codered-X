import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import Tunnel from './Tunnel';
import PrizeAndFooter from './PrizeAndFooter';
import Navbar from './Navbar';

import AboutSection from './AboutSection';
import TimelineSection from './TimelineSection';

function App() {
  const [trail, setTrail] = useState([]);
  const gridSize = 35;
  const trailRef = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const addTrailPoint = useCallback((x, y, colorClass = '') => {
    const newPoint = { x, y, id: Date.now() + Math.random(), createdAt: Date.now(), colorClass };
    if (trailRef.current.length > 0) {
      const last = trailRef.current[trailRef.current.length - 1];
      if (last.x === x && last.y === y) return;
    }

    trailRef.current = [...trailRef.current, newPoint];
    if (trailRef.current.length > 15) {
      trailRef.current = trailRef.current.slice(trailRef.current.length - 15);
    }
    setTrail([...trailRef.current]);
  }, []);

  useEffect(() => {
    // Continuously fade out old trail points, but NEVER remove the most recent one
    const interval = setInterval(() => {
      const now = Date.now();
      let changed = false;
      
      const newTrail = trailRef.current.filter((p, index) => {
        if (index === trailRef.current.length - 1) return true; // Always keep the head!
        if (now - p.createdAt > 450) {
          changed = true;
          return false;
        }
        return true;
      });

      if (changed) {
        trailRef.current = newTrail;
        setTrail([...trailRef.current]);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isFirstMove = useRef(true);

  // Smoothly interpolate the cursor trail towards the actual mouse position
  useEffect(() => {
    let animationFrameId;
    const loop = () => {
      if (!isFirstMove.current) {
        // Lerp factor (lower = more lag/spring, higher = tighter)
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.2;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.2;
        
        const snappedX = Math.floor(currentPos.current.x / gridSize) * gridSize;
        const snappedY = Math.floor(currentPos.current.y / gridSize) * gridSize;
        addTrailPoint(snappedX, snappedY, window.currentColorClass || '');
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [addTrailPoint, gridSize]);

  const handleMouseMove = (e) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    targetPos.current = { x: e.pageX, y: e.pageY };
    
    let colorClass = '';
    if (e.target && e.target.closest && e.target.closest('#prizes-wrapper')) {
      colorClass = 'cursor-trail-white';
    }
    
    // Pass color class to a ref if we need it in the loop, but wait...
    // The loop currently calls addTrailPoint(snappedX, snappedY) without color class.
    // I can modify the loop to pass it, but for now let's just create a current color class ref.
    if (!window.currentColorClass) window.currentColorClass = '';
    window.currentColorClass = colorClass;
    
    // Snap immediately on the very first mouse move so it doesn't fly in from 0,0
    if (isFirstMove.current) {
      currentPos.current = { x: e.pageX, y: e.pageY };
      isFirstMove.current = false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const pageX = lastMousePos.current.x + window.scrollX;
      const pageY = lastMousePos.current.y + window.scrollY;
      targetPos.current = { x: pageX, y: pageY };
      
      let colorClass = '';
      const el = document.elementFromPoint(lastMousePos.current.x, lastMousePos.current.y);
      if (el && el.closest && el.closest('#prizes-wrapper')) {
        colorClass = 'cursor-trail-white';
      }
      window.currentColorClass = colorClass;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>

      {/* Cursor trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className={`cursor-trail-highlight ${point.colorClass}`}
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            width: gridSize,
            height: gridSize,
            opacity: index === trail.length - 1 ? 0.4 : (index / trail.length) * 0.25,
          }}
        />
      ))}

      {/* ── Top nav ────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero: two-column layout ─────────────────────────────────────────
           Left  ~45%  → existing content (logo, labels, accent box)
           Right ~55%  → animated perspective tunnel canvas               */}
      <main className="hero-layout" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
        <div className="hero-left">
          <div className="logo-container">
            <h1 className="logo">CODERED <span style={{color: '#D90A16'}}>4.0</span></h1>
          </div>

          <div className="left-labels">
            <span>EMBEDDED</span>
            <span>INTELLIGENCE</span>
          </div>

          <div className="accent-box-container">
            <div className="accent-box">
              <div className="accent-box-header">EMBEDDED INTELLIGENCE</div>
              <p className="accent-box-text">
                A software solution that uses<br />
                real-time physics models and<br />
                control algorithms, to monitor<br />
                and estimate temperature<br />
                in critical areas.
              </p>
            </div>
            <div className="accent-box-step-1"></div>
            <div className="accent-box-step-2"></div>
          </div>
        </div>

        {/*  RIGHT COLUMN — tunnel canvas  */}
        <div className="hero-right">
          
        </div>

      </main>

      {/* ── About Section ─────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Timeline Section ──────────────────────────────────────────── */}
      <TimelineSection />

      <PrizeAndFooter />

      {/* Fixed link icon */}
      <div className="bottom-left-icon">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="#FF3333" d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,12.96 18.3,13.14 18.29,13.33L19.78,11.84L21.19,10.43C23.14,8.48 23.14,5.31 21.19,3.36C19.24,1.41 16.07,1.41 14.12,3.36L10.59,6.89C8.64,8.84 8.64,12.01 10.59,13.96L10.59,13.41ZM13.41,10.59C13,10.2 13,9.56 13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,11.04 5.7,10.86 5.71,10.67L4.22,12.16L2.81,13.57C0.86,15.52 0.86,18.69 2.81,20.64C4.76,22.59 7.93,22.59 9.88,20.64L13.41,17.11C15.36,15.16 15.36,11.99 13.41,10.04L13.41,10.59Z" />
        </svg>
      </div>

    </div>
  );
}

export default App;
