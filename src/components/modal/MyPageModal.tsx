import { useState } from 'react';
import styled from 'styled-components';
import Bubble from '../../assets/icon/Union.png';
import Modal from './Modal';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

export default function MyPageModal() {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };
  return (
    <>
      <SMyPageModalLayout>
        <img src={Bubble} alt="말풍선 모달 이미지" />
        <ul>
          <li>
            <button>마이페이지</button>
          </li>
          <li>
            <button onClick={openModal}>로그아웃</button>
          </li>
        </ul>
      </SMyPageModalLayout>
      {isShowModal && <Modal type="logout" setIsShowModal={setIsShowModal} />}
    </>
  );
}

const SMyPageModalLayout = styled.article`
  width: 8.125rem;
  position: absolute;
  top: 3.5rem;
  left: 50%;
  transform: translate(-50%);
  z-index: 99;

  img {
    width: inherit;
    filter: drop-shadow(0px 0px 0.375rem rgba(0, 0, 0, 0.25));
  }

  ul {
    position: absolute;
    top: 1.25rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;

    button {
      padding: 0.625rem 0;
      width: 6.875rem;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-medium);
      color: var(--dark-gray-color);
      transition: all 0.25s ease-in;

      &:first-child {
        margin-bottom: 0.5rem;
      }

      &:hover {
        border-radius: 0.3125rem;
        box-shadow: inset 0 0 0 1px var(--dark-gray-color);
        color: #000;
      }
    }
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    left: -1rem;
    top: 2.7rem;

    img {
      display: none;
    }

    ul {
      max-width: 7.8rem;
      padding: 0.6rem;
      box-sizing: border-box;
      position: unset;
      background-color: #fff;
      filter: drop-shadow(0px 0px 0.375rem rgba(0, 0, 0, 0.25));
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      button:first-child {
        margin-bottom: 0;
      }
    }
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    max-width: 6rem;
    gap: 0.1rem;

    ul {
      button {
        padding: 0.3rem 0;
        width: 5rem;
      }
    }
  }
`;
