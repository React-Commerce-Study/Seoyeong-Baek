import { useNavigate } from 'react-router-dom';
import ErrorImg from '../assets/icon/icon-404.svg';
import Button from '../components/common/Buttons/Button';
import styled from 'styled-components';

export default function NotFoundError() {
  const navigate = useNavigate();

  return (
    <SErrorMain>
      <div className="img-container">
        <img src={ErrorImg} alt="" />
      </div>
      <div className="contents-container">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br /> 웹 주소가 올바른지 확인해 주세요.
        </p>
        <div className="btn-wrapper">
          <Button onClick={() => navigate('/')}>메인으로</Button>
          <Button onClick={() => navigate(-1)} color="#767676" bgColor="#fff">
            이전 페이지
          </Button>
        </div>
      </div>
    </SErrorMain>
  );
}

const SErrorMain = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;

  .img-container {
    max-width: 276px;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .contents-container {
    max-width: 414px;

    h1 {
      font-size: 36px;
      font-weight: 700;
    }

    p {
      margin: 20px 0 40px;
      line-height: normal;
      font-weight: 400;
      color: #767676;
    }

    .btn-wrapper {
      display: flex;
      gap: 14px;

      & > button:last-child {
        box-shadow: inset 0 0 0 1px #c4c4c4;

        &:hover {
          background-color: #c4c4c4;
        }
      }
    }
  }
`;
