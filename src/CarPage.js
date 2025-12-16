import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/CarPage.css';

// Ensure these paths are correct relative to CarPage.js
import whatsapp from './assets/whatsapp.png';
import telegram from './assets/telegram.png';

function CarPage({ car, uiTexts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState('en');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  
  if (!car) {
    return <div className="error-container">Car not found</div>;
  }
  
  const allImages = [car.main_image, ...car.gallery];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in renting ${car.name}`);
    const phoneNumber = '995597912091';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  const handleTelegram = () => {
    const phoneNumber = '995597912091';
    window.open(`https://t.me/+${phoneNumber}`, '_blank'); 
  };
  
  // --- SMART BACK BUTTON IMPLEMENTATION ---
  const goBack = () => {
    // 1. Get the state passed from the Cars/AllCars component
    const { currentPage, scrollPosition, fromPath } = location.state || {};
    
    // 2. Navigate back to the source path (e.g., '/' or '/all-cars'), 
    //    and pass the state back to that component for restoration.
    navigate(fromPath || '/', { 
      state: { 
        currentPage: currentPage || 1, // Restore the pagination page
        scrollPosition: scrollPosition || 0 // Restore the scroll position
      } 
    });
  };
  
  const languageOptions = {
    en: { label: 'English', flag: '🇬🇧' },
    ka: { label: 'ქართული', flag: '🇬🇪' },
    ar: { label: 'العربية', flag: '🇸🇦' }
  };
  
  // Helper function to safely access UI texts
  const getUiText = (key) => uiTexts[key]?.[language] || `[${key} - ${language}]`;

  return (
    <div className="car-page-container">
      <div className="car-page-content">
        
        {/* BACK BUTTON AND HEADER */}
        <div className="car-page-header">
          <button className="back-button" onClick={goBack}>
            ← Back to Cars
          </button>
          
          {/* Language Dropdown */}
          <div className="language-dropdown-wrapper">
            <select 
              className="language-dropdown"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.entries(languageOptions).map(([code, { label, flag }]) => (
                <option key={code} value={code}>
                   {flag} {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Car Title */}
        <h1 className="car-page-title">{car.name}</h1>
        
        {/* Image Carousel */}
        <div className="carousel-container">
          <div className="carousel-main">
            <button className="carousel-arrow carousel-prev" onClick={prevImage}>
              ‹
            </button>
            
            <div className="carousel-image-wrapper">
              <img 
                src={allImages[currentImageIndex]} 
                alt={`${car.name} - Image ${currentImageIndex + 1}`}
                className="carousel-image"
              />
            </div>
            
            <button className="carousel-arrow carousel-next" onClick={nextImage}>
              ›
            </button>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="carousel-thumbnails">
            {allImages.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          
          {/* Dot Indicators */}
          <div className="carousel-dots">
            {allImages.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Car Details */}
        <div className="car-info-section">
          <div className="price-section">
            <span className="price-amount">{parseFloat(car.price).toFixed(2)} $</span>
            <span className="price-period">/ day</span>
          </div>
          
          <p className="features-text">
            {getUiText('features_description')}
          </p>
          
         {/* Rent Buttons */}
<div className="contact-buttons">
  <button className="contact-btn whatsapp-btn" onClick={handleWhatsApp}>
    <img src={whatsapp} alt="WhatsApp" className="btn-icon" />
    {getUiText('rent_button')}
  </button>
  
  <button className="contact-btn telegram-btn" onClick={handleTelegram}>
    <img src={telegram} alt="Telegram" className="btn-icon" />
    {getUiText('rent_button')}
  </button>
</div>
        </div>
      </div>
    </div>
  );
}

export default CarPage;