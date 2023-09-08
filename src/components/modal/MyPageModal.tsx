import { useState } from 'react';
import styled from 'styled-components';
import Bubble from '../../assets/icon/Union.png';
import Modal from './Modal';

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
  max-width: 130px;
  position: absolute;
  top: 3.5rem;
  left: 50%;
  transform: translate(-50%);
  z-index: 99;

  img {
    max-width: inherit;
    /* max-width: 130px; */

    filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
  }

  ul {
    position: absolute;
    top: 20px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;

    button {
      padding: 10px 0;
      width: 110px;
      font-size: 16px;
      font-weight: 500;
      color: #767676;
      transition: all 0.25s ease-out;

      &:first-child {
        margin-bottom: 8px;
      }

      &:hover {
        border-radius: 5px;
        box-shadow: inset 0 0 0 1px #767676;
        color: #000;
      }
    }
  }
`;
