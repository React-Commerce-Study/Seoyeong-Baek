import React, { useState } from 'react';
import styled from 'styled-components';
import Img1 from '../../assets/slide/1.jpeg';
import Img2 from '../../assets/slide/2.jpeg';
import Img3 from '../../assets/slide/3.png';
import Img4 from '../../assets/slide/4.jpeg';
import Left from '../../assets/icon/icon-swiper-1.svg';
import Right from '../../assets/icon/icon-swiper-2.svg';

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
    <CarouselStyle>
      <button className="pre-btn" type="button" onClick={handlePrevious}></button>
      <div className="carousel-box">
        <img src={images[currentIndex]} alt="Slideshow" />
      </div>
      <button className="next-btn" type="button" onClick={handleNext}></button>
    </CarouselStyle>
  );
}

const CarouselStyle = styled.div`
  width: 100%;
  position: relative;
  box-shadow: inset 0 0 10px red;
  background: #f2f2f2;

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: inset 0 0 10px red;
    padding: 20px;
  }

  .pre-btn {
    background: url(${Left}) no-repeat center center;
    left: 30px;
  }

  .next-btn {
    background: url(${Right}) no-repeat center center;
    right: 30px;
  }

  .carousel-box {
    max-height: 500px;
    max-width: 1280px;
    box-shadow: inset 0 0 10px red;
    margin: 0 auto;

    img {
      vertical-align: top;
      aspect-ratio: 1280/500;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
