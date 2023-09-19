import { useState } from 'react';
import styled from 'styled-components';
import Img1 from '../../assets/slide/img1.jpg';
import Img2 from '../../assets/slide/img2.jpg';
import Img3 from '../../assets/slide/img3.jpg';
import Img4 from '../../assets/slide/img4.jpg';
import Img5 from '../../assets/slide/img5.jpg';
import Img6 from '../../assets/slide/img6.jpg';
import Img7 from '../../assets/slide/img7.jpg';
import Img8 from '../../assets/slide/img8.jpg';
import Img9 from '../../assets/slide/img9.jpg';
import Img10 from '../../assets/slide/img10.jpg';
import Left from '../../assets/icon/icon-swiper-1.svg';
import Right from '../../assets/icon/icon-swiper-2.svg';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];

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
      <div className="dots-box">
        {images.map((_, index) => (
          <DotStyle key={index} bgColor={index === currentIndex}></DotStyle>
        ))}
      </div>
      <button className="next-btn" type="button" onClick={handleNext}></button>
    </CarouselStyle>
  );
}

const CarouselStyle = styled.div`
  width: 100%;
  position: relative;
  background: #f2f2f2;

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
    margin: 0 auto;

    img {
      vertical-align: top;
      aspect-ratio: 1280/500;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dots-box {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }
`;

type DotStyleProps = {
  bgColor: boolean;
};

const DotStyle = styled.div<DotStyleProps>`
  background: ${(props: DotStyleProps) => (props.bgColor ? '#fff' : 'var(--dark-gray-color)')};

  border-radius: 100%;
  height: 10px;
  width: 10px;
  margin-left: 20px;
`;
