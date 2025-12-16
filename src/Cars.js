import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Cars.css';
import { carsData } from './Data';

gsap.registerPlugin(ScrollTrigger);

function Cars() {
  const location = useLocation();
  // Initialize currentPage from location state if returning from CarPage
  const [currentPage, setCurrentPage] = useState(location.state?.currentPage || 1);
  const carsPerPage = 8;
  const carListRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionRef = useRef(null);

  const totalPages = Math.ceil(carsData.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carsData.slice(indexOfFirstCar, indexOfLastCar);

  // Restore scroll position and page when returning from car page
  useEffect(() => {
    if (location.state?.scrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo({ 
          top: location.state.scrollPosition, 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location.state]);

  // Animate on scroll and page change
  useEffect(() => {
    const cards = carListRef.current?.querySelectorAll('.car-card-link');
    
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carListRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentPage, currentCars]);

  // Animate title on scroll
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    // Scroll to cars section using scrollIntoView
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handleCarClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get consistent scroll position for the cars section
  const getScrollPosition = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      return window.pageYOffset + rect.top - 100;
    }
    return 800;
  };

  return (
    <section id="cars-section" ref={sectionRef} className="cars-section">
      <div className="cars-section-container">
        <h1 ref={titleRef} className="section-title">
          Explore Our Collection of Cars
        </h1>
        <span ref={subtitleRef} className="section-subtitle">
          Choose your favorite car from our extensive collection.
        </span>
      </div>

      <div ref={carListRef} className="car-list-container">
        {currentCars.map((car) => (
          <Link 
            to={`/car/${car.id}`} 
            key={car.id} 
            className="car-card-link"
            state={{ 
              currentPage, 
              scrollPosition: getScrollPosition(),
              fromPath: '/' // <--- LINK 1: The outer link wrapper
            }}
            onClick={handleCarClick}
          >
            <div className="car-card">
              <div className="car-image-wrapper">
                <img
                  src={car.main_image} 
                  alt={car.name}
                  className="car-image"
                  onError={(e) => {
                    console.error(`Failed to load image for ${car.name}:`, car.main_image);
                    e.target.src = `${process.env.PUBLIC_URL}/assets/placeholder.png`; 
                  }}
                />
              </div>
              <div className="car-details">
                <h3 className="car-name">{car.name}</h3>
                <div className="car-price-block">
                  <span className="price-value">
                    {parseFloat(car.price).toFixed(2)} $
                  </span>
                  <span className="price-suffix">/ day</span>
                </div>
                
                {/* LINK 2: The inner "Rent a Car" button FIX IS HERE */}
                <Link 
                  to={`/car/${car.id}`}
                  className="rent-button"
                  state={{ 
                    currentPage, 
                    scrollPosition: getScrollPosition(),
                    fromPath: '/' // <--- LINK 2: Added missing fromPath
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCarClick();
                  }}
                >
                  Rent a Car
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-arrow"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {getPageNumbers().map((number, index) => (
            <React.Fragment key={index}>
              {number === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  className={`pagination-number ${
                    currentPage === number ? 'active' : ''
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            className="pagination-arrow"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Cars;