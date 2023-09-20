import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftBtn from '../../assets/icon/icon-swiper-1.svg';
import RightBtn from '../../assets/icon/icon-swiper-2.svg';
import { getRandomImages } from '../../services/ResponseApi';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // 랜덤이미지 불러오기
  useEffect(() => {
    getRandomImages()
      .then((imageLinks) => {
        console.log(imageLinks);
        setImages(imageLinks);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <CarouselStyle>
      <article className="carousel-contents">
        <button className="pre-btn" type="button" onClick={handlePrevious}></button>
        <CarouselContainer>
          <div className="carousel-img-wrapper">
            <img src={images[currentIndex]} alt="Slideshow" />
          </div>
          <div className="dots-box">
            {images.map((_, index) => (
              <DotStyle key={index} bgColor={index === currentIndex}></DotStyle>
            ))}
          </div>
        </CarouselContainer>
        <button className="next-btn" type="button" onClick={handleNext}></button>
      </article>
    </CarouselStyle>
  );
}

const CarouselStyle = styled.section`
  width: 100%;
  position: relative;
  box-shadow: inset 0 0 10px red;

  .carousel-contents {
    max-height: 32rem;
    max-width: 80rem;
    margin: 0 auto;
    position: relative;
  }

  button {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 1.25rem;
    border-radius: 50%;
    /* margin: 0 1rem; */
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #fff;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
    }
  }

  .pre-btn {
    background: url(${LeftBtn}) no-repeat center center;
    left: 1.9rem;
  }

  .next-btn {
    background: url(${RightBtn}) no-repeat center center;
    right: 1.9rem;
  }
`;

const CarouselContainer = styled.div`
  .carousel-img-wrapper {
    img {
      vertical-align: top;
      aspect-ratio: 1280/512;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dots-box {
    position: absolute;
    bottom: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 0.75rem;
  }
`;

type DotStyleProps = {
  bgColor: boolean;
};

const DotStyle = styled.div<DotStyleProps>`
  background: ${(props: DotStyleProps) => (props.bgColor ? 'var(--point-color)' : 'var(--light-gray-color)')};
  border-radius: 50%;
  height: 0.55rem;
  width: 0.55rem;
`;
