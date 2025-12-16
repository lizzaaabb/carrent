import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import './styles/Landing.css';

function Landing() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    // Animate description
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    // Animate buttons
    .fromTo(
      buttonsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.4'
    );

    // Button hover animations
    const buttons = buttonsRef.current.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className='landing-body'
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/back12.jpg)` }}
    >
      <div className='landing-overlay'></div>
      <div className='landing-content'>
        <h1 ref={titleRef} className='landing-title'>
          Premium Car Rental — Your Top Choice
        </h1>
        <p ref={descriptionRef} className='landing-description'>
          Discover premium-class vehicles with top-quality service.
          We offer a wide selection of modern cars, ready to become the perfect companion for your journey.
        </p>
        <div ref={buttonsRef} className='landing-buttons'>
          {/* Discover Cars button navigates to /all-cars */}
          <Link 
            to="/all-cars" 
            className="button" 
            style={{ textDecoration: 'none' }} // only remove underline
          >
            <span>Discover Cars</span>
          </Link>

          <Link 
  to="/contact" 
  className="button" 
  style={{ textDecoration: 'none' }}
>
  <span>Contact Us</span>
</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
