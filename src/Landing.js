import React from 'react';
import './styles/Landing.css';

function Landing() {
  return (
    <div
      className='landing-body'
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/back11.jpg)` }}
    >
      <div className='landing-overlay'></div>
      <div className='landing-content'>
        <h1 className='landing-title'>Premium Car Rental — Your Top Choice</h1>
        <p className='landing-description'>
          Discover premium-class vehicles with top-quality service.
We offer a wide selection of modern cars, ready to become the perfect companion for your journey.
        </p>
        <div className='landing-buttons'>
          <button className="button">
            <span>Discover Cars</span>
          </button>
          <button className="button">
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;