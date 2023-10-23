import React, { useState, useEffect } from 'react';
import './MainDash.css'
import { DataCheck } from '..'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import main1 from '../../imgs/main1.png'
import main2 from '../../imgs/main2.png'
import main3 from '../../imgs/main3.png'
import main4 from '../../imgs/main4.png'
import main5 from '../../imgs/main5.png'

const MainDash = () => {
  const images = [main1, main2, main3, main4, main5];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className='MainDash'>
      <h1>즐겁고 건강한 술문화</h1>
      <DataCheck />
      <div className='imgslide'>
      <Carousel selectedItem={currentSlide} onChange={(nextSlide) => setCurrentSlide(nextSlide)}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
      </div>

    </div>
  )
}

export default MainDash