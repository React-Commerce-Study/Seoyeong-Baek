import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftBtn from '../../assets/icon/icon-swiper-1.svg';
import RightBtn from '../../assets/icon/icon-swiper-2.svg';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';
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
  box-shadow: inset 0 0 10px red;

  .carousel-contents {
    max-height: 32rem;
    max-width: 80rem;
    margin: 0 auto;
    position: relative;
  }

  button {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: all 0.2s ease-in-out;

    &::before {
      content: '';
      display: block;
      background: url(${LeftBtn}) no-repeat center;
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      background-color: #fff;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  }

  .pre-btn {
    left: 1.9rem;
  }
  .next-btn {
    right: 1.9rem;
  }
  .next-btn::before {
    background: url(${RightBtn}) no-repeat center;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    button {
      width: 1.6rem;
      height: 1.6rem;
    }

    .pre-btn {
      left: 1.3rem;
      &::before {
        background: url(${LeftBtn}) no-repeat center / cover;
        right: -0.4rem;
      }
    }
    .next-btn {
      right: 1.3rem;
      &::before {
        background: url(${RightBtn}) no-repeat center / cover;
        left: -0.4rem;
      }
    }
  }
`;

const CarouselContainer = styled.div`
  .carousel-img-wrapper {
    img {
      vertical-align: top;
      aspect-ratio: 1280/512;
      width: 100%;
      height: 100%;
      min-height: 18rem;
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

  ${mediaQuery(BREAKPOINT_TABLET)} {
    .dots-box {
      gap: 0.6rem;
    }
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

  ${mediaQuery(BREAKPOINT_TABLET)} {
    height: 0.4rem;
    width: 0.4rem;
  }
`;
