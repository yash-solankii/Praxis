import React from 'react';
import './Homepage.css';
import LiquidEther from './LiquidEther';

const Homepage = () => {

  return (
    <div className="homepage">
      {/* Background Animation */}
      <div className="background-wrapper">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={10}
          cursorSize={120}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.7}
          dt={0.014}
          BFECC={true}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="homepage-content">
        <div className="hero-section-left">
          <h1 className="hero-title">Praxis</h1>
          <p className="hero-subtitle">Execute, Test, Master</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

