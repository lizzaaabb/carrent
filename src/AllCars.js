import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // <-- useLocation imported
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/AllCars.css';
// Assuming 'carsData' is correctly imported from './Data'
import { carsData } from './Data'; 

gsap.registerPlugin(ScrollTrigger);

function AllCars() {
  const location = useLocation(); // <-- Location Hook declared

  // Initialize currentPage from location state if returning from CarPage, otherwise default to 1
  const [currentPage, setCurrentPage] = useState(location.state?.currentPage || 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const carsPerPage = 16; 
  
  const carListRef = useRef(null);
  const searchRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRef = useRef(null); // Reference for the overall section

  // Filter cars based on search query
  const filteredCars = carsData.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // === FIX 2: SCROLL RESTORATION EFFECT ===
  useEffect(() => {
    if (location.state?.scrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo({ 
          top: location.state.scrollPosition, 
          behavior: 'instant' 
        });
      }, 100);
      
      // Note: We typically don't need to clear the state here as the back navigation handles it.
    }
  }, [location.state]);


  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search

    if (value.trim()) {
      const filtered = carsData
        .filter(car => car.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Show max 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (carName) => {
    setSearchQuery(carName);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  // Animate cards on scroll
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

  // Animate title
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7,
        ease: 'power2.out'
      }
    );
  }, []);

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    
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

  // Calculates the scroll position of the top of the cars section
  const getScrollPosition = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      return window.pageYOffset + rect.top - 100;
    }
    return 800;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <section id="cars-section" ref={sectionRef} className="cars-section">
        <div className="cars-section-container">
          <h1 ref={titleRef} className="section-title2">
            All Available Cars
          </h1>
          <span className="section-subtitle">
            Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
          </span>

          {/* Search Bar */}
          <div className="search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search for a car..."
                value={searchQuery}
                onChange={handleSearchChange} // Changed to use handleSearchChange
                onFocus={() => searchQuery && setShowSuggestions(true)}
                style={{ color: '#333'}}
              />
              {searchQuery && (
                <button className="clear-search" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((car) => (
                  <div
                    key={car.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(car.name)}
                  >
                    <img src={car.main_image} alt={car.name} className="suggestion-image" />
                    <div className="suggestion-details">
                      <span className="suggestion-name">{car.name}</span>
                      <span className="suggestion-price">${car.price}/day</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div ref={carListRef} className="car-list-container car-list-four-columns">
          {currentCars.length > 0 ? (
            currentCars.map((car) => (
              <Link 
                to={`/car/${car.id}`} 
                key={car.id} 
                className="car-card-link"
                state={{ 
                  currentPage, 
                  scrollPosition: getScrollPosition(),
                  fromPath: '/all-cars' // <-- Crucial for CarPage back button
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCarClick();
                }}
              >
                <div className="car-card">
                  <div className="car-image-wrapper">
                    <img
                      src={car.main_image} 
                      alt={car.name}
                      className="car-image"
                      onError={(e) => {
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
                    
                    {/* Inner Rent Button Link */}
                    <Link 
                      to={`/car/${car.id}`}
                      className="rent-button"
                      state={{ 
                        currentPage, 
                        scrollPosition: getScrollPosition(),
                        fromPath: '/all-cars' // <-- Crucial for CarPage back button
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
            ))
          ) : (
            <div className="no-results">
              <h3>No cars found</h3>
              <p>Try adjusting your search query</p>
            </div>
          )}
        </div>

        {/* Pagination */}
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
                          key={number}
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


    </>
  );
}

export default AllCars;