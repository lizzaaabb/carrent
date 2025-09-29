// Cars.js
import React, { useState } from 'react';
import './styles/Cars.css';
import { carsData } from './Data';

function Cars() {
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8; // 2 rows of 4 cars each

  // Calculate pagination
  const totalPages = Math.ceil(carsData.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carsData.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of cars section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
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

  return (
    <section className="cars-section">
      <div className="cars-section-container">
        <h1 className="section-title">
          Explore Our Collection of Cars
        </h1>
        <span className="section-subtitle">
          Choose your favorite car from our extensive collection.
        </span>
      </div>

      <div className="car-list-container">
        {currentCars.map((car) => (
          <a href={`/car/${car.id}`} key={car.id} className="car-card-link">
            <div className="car-card">
              <div className="car-image-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}${car.main_image}`}
                  alt={car.name}
                  className="car-image"
                />
              </div>
              <div className="car-details">
                <h3 className="car-name">{car.name}</h3>
                <div className="car-price-block">
                  <span className="price-value">
                    ${parseFloat(car.price).toFixed(2)}
                  </span>
                  <span className="price-suffix">/ day</span>
                </div>
                <button
                  className="rent-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Attempting to book ${car.name}`);
                  }}
                >
                  Rent a Car
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination Controls */}
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