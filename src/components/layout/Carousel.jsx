import React, { useState } from 'react';
import Img1 from '../../assets/slide/1.jpeg';
import Img2 from '../../assets/slide/2.jpeg';
import Img3 from '../../assets/slide/3.png';
import Img4 from '../../assets/slide/4.jpeg';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Img1, Img2, Img3, Img4];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <button className="pre-btn" type="button" onClick={handlePrevious}></button>
      <div className="carousel-box">
        <img src={images[currentIndex]} alt="Slideshow" />
      </div>
      <button className="next-btn" type="button" onClick={handleNext}></button>
    </div>
  );
}
