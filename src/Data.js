// Data.js

import car1 from './assets/car1.png';
import car2 from './assets/car2.png';
import car3 from './assets/car3.png';
import car4 from './assets/car4.png';
import car5 from './assets/car5.png';
import car6 from './assets/car6.png';

export const carsData = [
  // Car 1
  {
    id: "C001",
    name: "BMW X3 2016",
     price: 60.00, // NO QUOTES, NO $, NO SPACES
    // IMAGE 1: Used for the landing page thumbnail/list view
    main_image: car1,
    
    // IMAGE 2: Used for the photo carousel/gallery on the detail page
    gallery: [
      "/assets/golf_r_interior.jpg",
      "/assets/golf_r_rear.jpg",
      "/assets/golf_r_wheel.jpg",
    ]
  },
  
  // Car 2
  {
    id: "C002",
    name: "Mercedes Benz Gle",
    price: 90.00,
    
    // IMAGE 1:
    main_image: car2,

    // IMAGE 2:
    gallery: [
      "/assets/tesla_m3_interior.jpg",
      "/assets/tesla_m3_charging.jpg",
      "/assets/tesla_m3_screen.jpg",
      "/assets/tesla_m3_roof.jpg",
    ]
  },
  
  // Car 3
  {
    id: "C003",
    name: "Mazda CX-5 2017",
    price: 50.00,
    
    // IMAGE 1:
    main_image: car3,

    // IMAGE 2:
    gallery: [
      "/assets/f150_raptor_mud.jpg",
      "/assets/f150_raptor_dashboard.jpg",
    ]
  },

  // Car 4
  {
    id: "C004",
    name: "Mazda CX-5 2014",
    price: 45.00,
    
    // IMAGE 1:
    main_image: car4,

    // IMAGE 2:
    gallery: [
      "/assets/audi_q5_interior.jpg",
      "/assets/audi_q5_rear.jpg",
      "/assets/audi_q5_wheel.jpg",
    ]
  },
    // Car 5
    {
    id: "C005",
    name: "Mitsubishi Outlander 2020 Sport",
    price: 50.00,
    
    // IMAGE 1:
    main_image: car5,

    // IMAGE 2:
    gallery: [
      "/assets/audi_q5_interior.jpg",
      "/assets/audi_q5_rear.jpg",
      "/assets/audi_q5_wheel.jpg",
    ]
  },

  // Car 6
  {
    id: "C006",
    name: "Mazda CX-5 2016",
    price: 50.00,
    
    // IMAGE 1:
    main_image: car6,

    // IMAGE 2:
    gallery: [
      "/assets/golf_r_interior.jpg",
      "/assets/golf_r_rear.jpg",
      "/assets/golf_r_wheel.jpg",
    ]
  },

  
  
];


// TranslationData.js

export const uiTexts = {
  
  // --- BUTTON TEXT ---
  rent_button: {
    en: "Rent a Car",
    ka: "მანქანის ქირაობა",
    ar: "استئجار سيارة",
  },
  
  // --- DESCRIPTION / FEATURES TEXT ---
  features_description: {
    en: "Free delivery to your address and free pickup, no deposit required.",
    ka: "მანქანის მისამართზე მიყვანა და დაბრუნება უფასოდ, დეპოზიტის გარეშე.",
    ar: "توصيل السيارة إلى عنوانك واستلامها مجانًا، بدون وديعة.",
  }
};