// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Cars from './Cars';
import CarPage from './CarPage'; 
import Footer from './Footer';
import AllCars from './AllCars';   
import Contact from './Contact';   // ✅ already imported

import { carsData, uiTexts } from './Data'; 

function CarPageWrapper() {
  const { id } = useParams();
  const car = carsData.find(c => c.id === id); 
  
  if (!car) {
    return <h1>404 Car Not Found</h1>; 
  }
  return <CarPage car={car} uiTexts={uiTexts} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Landing + cars */}
          <Route 
            path="/" 
            element={
              <main>
                <Landing />
                <Cars />
              </main>
            } 
          />

          {/* All Cars page */}
          <Route path="/all-cars" element={<AllCars />} />  

          {/* Contact page */}
          <Route path="/contact" element={<Contact />} />   {/* ✅ new route */}

          {/* Car detail page */}
          <Route path="/car/:id" element={<CarPageWrapper />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
