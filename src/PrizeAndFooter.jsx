
import React from 'react';
import './DemoStyles.css';
import Tunnel from './Tunnel';
import BinaryTerrain from './BinaryTerrain';

export default function PrizeAndFooter() {
  return (
    <>
        {/*  Prize Pool Section (Updated to ₹60k Total: 1st 30k, 2nd 20k, 3rd 10k)  */}
  <div id="prizes-wrapper" style={{"backgroundColor":"#FF3333","width":"100%","position":"relative","paddingBottom":"60px"}}>
  <section id="prizes" className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
    <div className="tracks__header" style={{"marginBottom":"48px"}}>
      <div className="bitmela-eyebrow">
        <span></span> PRIZES
      </div>
      <h2 className="bitmela-heading">Two tracks, <em className="bitmela-italic">two purses.</em></h2>
      <p className="bitmela-sub">
        Split evenly across both battlefields — ₹30,000 for Hardware, ₹30,000 for Software. Two tracks, two champions, one night to remember.
      </p>
      <div id="vestaboard-prize" className="vestaboard-container" style={{"display":"flex","flexDirection":"column","gap":"4px","width":"100%","alignItems":"center","marginTop":"32px"}}></div>
    </div>

    <div className="prize-grid">
      
      {/*  2nd Place  */}
      <div className="ticket-wrapper ticket-wrapper--second">
        <div className="ticket ticket--second">
          <div className="ticket__ribbon">
            <div className="ticket__ribbon-rank">2</div>
            <div className="ticket__ribbon-text">SECOND<br />PLACE</div>
          </div>
          <div className="ticket__top">
            <span>CODE RED 4.0 &bull; ED.01</span>
            <span>N&ordm; 000102</span>
          </div>
          <div className="ticket__divider-wrapper"><div className="ticket__divider"></div></div>
          <div className="ticket__body">
            <div className="ticket__label">CASH PRIZE</div>
            <div className="ticket__amount">₹9,000</div>
          </div>
          <div className="ticket__stub">
            <div className="ticket__stub-barcode">
              <div className="ticket__stub-grid">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="ticket__stub-lines"></div>
            </div>
            <div className="ticket__stub-footer">
              <span>EDITION 01</span>
              <span>ADMIT ONE</span>
            </div>
          </div>
        </div>
      </div>

      {/*  1st Place  */}
      <div className="ticket-wrapper ticket-wrapper--first">
        <div className="ticket ticket--first">
          <div className="ticket__ribbon">
            <div className="ticket__ribbon-rank">1</div>
            <div className="ticket__ribbon-text">FIRST<br />PLACE</div>
          </div>
          <div className="ticket__top">
            <span>CODE RED 4.0 &bull; ED.01</span>
            <span>N&ordm; 000101</span>
          </div>
          <div className="ticket__divider-wrapper"><div className="ticket__divider"></div></div>
          <div className="ticket__body">
            <div className="ticket__label">CASH PRIZE</div>
            <div className="ticket__amount">₹15,000</div>
          </div>
          <div className="ticket__stub">
            <div className="ticket__stub-barcode">
              <div className="ticket__stub-grid">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="ticket__stub-lines"></div>
            </div>
            <div className="ticket__stub-footer">
              <span>EDITION 01</span>
              <span>ADMIT ONE</span>
            </div>
          </div>
        </div>
      </div>

      {/*  3rd Place  */}
      <div className="ticket-wrapper ticket-wrapper--third">
        <div className="ticket ticket--third">
          <div className="ticket__ribbon">
            <div className="ticket__ribbon-rank">3</div>
            <div className="ticket__ribbon-text">THIRD<br />PLACE</div>
          </div>
          <div className="ticket__top">
            <span>CODE RED 4.0 &bull; ED.01</span>
            <span>N&ordm; 000103</span>
          </div>
          <div className="ticket__divider-wrapper"><div className="ticket__divider"></div></div>
          <div className="ticket__body">
            <div className="ticket__label">CASH PRIZE</div>
            <div className="ticket__amount">₹6,000</div>
          </div>
          <div className="ticket__stub">
            <div className="ticket__stub-barcode">
              <div className="ticket__stub-grid">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="ticket__stub-lines"></div>
            </div>
            <div className="ticket__stub-footer">
              <span>EDITION 01</span>
              <span>ADMIT ONE</span>
            </div>
          </div>
        </div>
    </div>
  </div>
  </section>
  </div>

  {/*  Binary Matrix Terrain Transition Banner  */}
  <div style={{"position":"relative","height":"300px","width":"100%","backgroundColor":"#05080B","overflow":"hidden"}}>
    <BinaryTerrain />
  </div>



  {/*  LAUNCHPAD CTA  */}
  <section id="launchpad" className="dark-paper-bg" style={{"color":"#ffffff","position":"relative","overflow":"hidden","minHeight":"780px","display":"flex","alignItems":"center","justifyContent":"center","padding":"120px 72px"}}>
    
    {/* Smooth transition gradient from previous section */}
    <div style={{
      position: 'absolute',
      top: -1,
      left: 0,
      width: '100%',
      height: '350px',
      background: 'linear-gradient(to bottom, #05080B 0%, rgba(5, 8, 11, 0) 100%)',
      backdropFilter: 'blur(32px)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
      zIndex: 10,
      pointerEvents: 'none'
    }}></div>

    {/*  Pixel mound — left (yellow)  */}
    <img src="/mound-left.png" alt="" aria-hidden="true" style={{"position":"absolute","left":"0","bottom":"0","width":"34%","height":"auto","pointerEvents":"none","objectFit":"contain","objectPosition":"left bottom"}} />
    {/*  Pixel mound — right (blue)  */}
    <img src="/mound-right.png" alt="" aria-hidden="true" style={{"position":"absolute","right":"0","bottom":"0","width":"40%","height":"auto","pointerEvents":"none","objectFit":"contain","objectPosition":"right bottom"}} />

    {/*  Center content  */}
    <div style={{"position":"relative","zIndex":"2","display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","gap":"24px","maxWidth":"760px"}}>
      <div style={{"fontFamily":"var(--font-mono)","fontSize":"13px","fontWeight":"600","letterSpacing":"0.18em","textTransform":"uppercase","color":"#6BB7F2"}}>
        Code Red 4.0 '26 · Hackathon
      </div>
      <h2 style={{"margin":"0","fontFamily":"'Bricolage Grotesque', sans-serif","fontWeight":"800","fontSize":"clamp(2rem, 6vw, 56px)","lineHeight":"1.02","letterSpacing":"-0.015em"}}>
        What happens when<br />
        <span style={{"fontFamily":"'Press Start 2P', monospace","fontSize":"0.7em","color":"var(--minion-yellow)","letterSpacing":"-0.02em","verticalAlign":"baseline"}}>HARDWARE</span> meets <em style={{"fontFamily":"'Newsreader', serif","fontWeight":"600","color":"#FF3333"}}>Software?</em>
      </h2>
      <div style={{"fontFamily":"'Newsreader', serif","fontSize":"20px","lineHeight":"1.5","maxWidth":"520px","color":"#ffffff"}}>
        Builder, student, founder, or just curious — doesn't matter. Sign up, pull up, get in the game.
      </div>
      <div style={{"display":"flex","gap":"28px","flexWrap":"wrap","justifyContent":"center","fontFamily":"var(--font-mono)","fontSize":"13px","letterSpacing":"0.1em","color":"#8B8199"}}>
        <span>NATIONWIDE OUTREACH</span><span>·</span><span>TOP FINALIST TEAMS</span><span>·</span><span style={{"color":"#ffffff"}}>₹60K PRIZE POOL</span>
      </div>
      <div style={{"display":"flex","gap":"16px","flexWrap":"wrap","justifyContent":"center","marginTop":"8px"}}>
        <a href="#about" className="launchpad-btn-primary">SEE THE DETAILS</a>
        <button className="launchpad-btn-secondary open-modal-btn">REGISTER NOW</button>
      </div>
    </div>
  </section>

    </>
  );
}
