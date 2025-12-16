import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Contact.css';
import whatsapp from './assets/whatsapp.png';
import telegram from './assets/telegram.png';

const contactTexts = {
  title: {
    en: "Contact Us",
    ka: "დაგვიკავშირდით",
    ar: "اتصل بنا"
  },
  address_label: {
    en: "Address",
    ka: "მისამართი",
    ar: "العنوان"
  },
  phone_label: {
    en: "Phone",
    ka: "ტელეფონი",
    ar: "الهاتف"
  },
  email_label: {
    en: "Email",
    ka: "ელ-ფოსტა",
    ar: "البريد الإلكتروني"
  },
  whatsapp_btn: {
    en: "WhatsApp",
    ka: "WhatsApp",
    ar: "واتساب"
  },
  telegram_btn: {
    en: "Telegram",
    ka: "Telegram",
    ar: "تيليجرام"
  },
  back_btn: {
    en: "Back",
    ka: "უკან",
    ar: "رجوع"
  },
  info_text: {
    en: "Get in touch with us for car rental inquiries. We're here to help you find the perfect vehicle for your needs.",
    ka: "დაგვიკავშირდით მანქანის ქირაობასთან დაკავშირებით. ჩვენ მზად ვართ დაგეხმაროთ თქვენთვის სასურველი ავტომობილის არჩევაში.",
    ar: "تواصل معنا للاستفسار عن تأجير السيارات. نحن هنا لمساعدتك في العثور على السيارة المثالية لاحتياجاتك."
  }
};

function Contact() {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/995597912091', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/+995597912091', '_blank');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='contact-body'>
      <div className="contact-content">
        {/* Header with Back Button and Language Dropdown */}
        <div className="contact-header">
          <button className="back-button" onClick={handleBack}>
            <span>←</span>
            {contactTexts.back_btn[language]}
          </button>
          
          <div className="language-dropdown-wrapper">
            <select 
              className="language-dropdown" 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ka">ქართული</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        {/* Page Title */}
        <h1 className="contact-title">{contactTexts.title[language]}</h1>

        {/* Info Container */}
        <div className="contact-info-container">
          {/* Description Text */}
          <p className="contact-info-text">{contactTexts.info_text[language]}</p>

          {/* Contact Details */}
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-item-content">
                <h3 className="contact-label">{contactTexts.address_label[language]}</h3>
                <p className="contact-value">Nodar Dumbadze Street, 1, Tbilisi</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-item-content">
                <h3 className="contact-label">{contactTexts.phone_label[language]}</h3>
                <a href="tel:+995597912091" className="contact-value contact-link">
                  +995 597 91 20 91
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-item-content">
                <h3 className="contact-label">{contactTexts.email_label[language]}</h3>
                <a href="mailto:pavlepetriashvili@gmail.com" className="contact-value contact-link">
                  pavlepetriashvili@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="contact-buttons">
            <button className="contact-btn whatsapp-btn" onClick={handleWhatsApp}>
              <img src={whatsapp} alt="WhatsApp" className="btn-icon-img" />
              {contactTexts.whatsapp_btn[language]}
            </button>
            <button className="contact-btn telegram-btn" onClick={handleTelegram}>
              <img src={telegram} alt="Telegram" className="btn-icon-img" />
              {contactTexts.telegram_btn[language]}
            </button>
          </div>
        </div>

       {/* Google Maps */}
<div className="map-container">
  <iframe
    title="Location Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.9978459440426!2d44.827726476297535!3d41.78526007125204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446c56e7fcdf49%3A0x5cb982746bfa3857!2s1%20Nodar%20Dumbadze%20Ave%2C%20T'bilisi%200112!5e0!3m2!1sen!2sge!4v1759478321813!5m2!1sen!2sge"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
      </div>
    </div>
  );
}

export default Contact;