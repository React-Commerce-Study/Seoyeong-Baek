import Button from '../common/Buttons/Button';
import PlusIcon from '../../assets/icon/icon-plus.svg';
import styled from 'styled-components';

export default function SellerCenterTitleWrapper() {
  return (
    <SSellerCenterTitleWrapper>
      <h2>
        대시보드 <strong>백엔드글로벌</strong>
      </h2>
      <div className="btn-box">
        <Button padding="16px 0 16px 39px" fontWeight="var(--font-weight-medium)">
          상품 업로드
        </Button>
      </div>
    </SSellerCenterTitleWrapper>
  );
}

const SSellerCenterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 0 10px pink;

  .btn-box {
    width: 10.5rem;
    position: relative;

    & > button::before {
      content: '';
      display: block;
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      background: url(${PlusIcon}) center no-repeat;
      width: 1.875rem;
      height: 1.875rem;
    }
  }

  h2 {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);

    strong {
      color: var(--point-color);
    }
  }
`;
