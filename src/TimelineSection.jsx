import React from 'react';
import Tunnel from './Tunnel';
import './TimelineSection.css';

const TimelineSection = () => {
  return (
    <section className="timeline-section">
      <div className="timeline-left">
        <Tunnel />
      </div>
      
      <div className="timeline-right">
        <h2 className="timeline-heading">
          <span className="highlight-italic">Here's</span> What's Coming!
        </h2>
        
        <div className="timeline-scroll-area">
          <div className="timeline-list">
            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Launch</h3>
                <p className="timeline-subtext">The event officially begins!</p>
              </div>
              <div className="timeline-pill">
                30th October 2025
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Release of Problem Statement</h3>
                <p className="timeline-subtext">Problem statements for participants are revealed.</p>
              </div>
              <div className="timeline-pill">
                11:59 PM, 31st October 2025
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Registrations Open</h3>
                <p className="timeline-subtext">Teams can start registering for the event.</p>
              </div>
              <div className="timeline-pill">
                9:00 AM, 1st November 2025
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Registrations Ends</h3>
                <p className="timeline-subtext">Registration window closes on Unstop</p>
              </div>
              <div className="timeline-pill">
                11:59 PM, 22nd November 2025
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Round 1 Ends</h3>
                <p className="timeline-subtext">Submission window for Round 1 closes.</p>
              </div>
              <div className="timeline-pill">
                11:59 PM, 22nd November 2025
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Top 50 Teams Announced</h3>
                <p className="timeline-subtext">The top 50 teams advancing to Round 2 are revealed.</p>
              </div>
              <div className="timeline-pill">
                11:59 PM, 1st December 2025
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-info">
                <h3 className="timeline-title">Round 2 Registration Deadline</h3>
                <p className="timeline-subtext">Last date for selected teams to register for Round 2.</p>
              </div>
              <div className="timeline-pill">
                7:00 PM, 5th December 2025
              </div>
            </div>
            
            <div className="timeline-item grand-finale">
              <div className="timeline-info">
                <h3 className="timeline-title">Grand Finale</h3>
                <p className="timeline-subtext">Final presentations and event conclusion.</p>
              </div>
              <div className="timeline-pill highlight">
                12th & 13th December 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
