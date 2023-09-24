import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mediaQuery, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';

export default function ScrollTopButton() {
  const [isShowButton, setIsShowButton] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const showButton = () => {
      window.scrollY > 10 ? setIsShowButton(true) : setIsShowButton(false);
    };
    window.addEventListener('scroll', showButton);

    return () => {
      window.removeEventListener('scroll', showButton);
    };
  }, []);

  return (
    <>
      {isShowButton && (
        <SScrollTopButton>
          <button type="button" onClick={handleScrollTop}>
            Top
          </button>
          {/* <p className="text">Back to Top</p> */}
        </SScrollTopButton>
      )}
    </>
  );
}

const SScrollTopButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(#44ea76, #39fad7);
    border-radius: 50%;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    color: #fff;
    transition: all 0.25s ease-in-out;

    &:hover {
      background-color: #00bfff;
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    bottom: 1rem;
    right: 1rem;

    button {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;
