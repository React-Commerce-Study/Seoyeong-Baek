import Button from '../common/Buttons/Button';
import PlusIcon from '../common/icons/PlusIcon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function SellerCenterTitleWrapper() {
  return (
    <SSellerCenterTitleWrapper>
      <h2>
        대시보드 <strong>백엔드글로벌</strong>
      </h2>
      <div className="btn-box">
        <Link to="/seller/post-product">
          <Button padding="1rem 0 1rem 2.4375rem" fontWeight="var(--font-weight-medium)">
            <PlusIcon />
            상품 업로드
          </Button>
        </Link>
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

    svg {
      width: 1.875rem;
      height: 1.875rem;
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.25s ease-out;
    }

    &:hover svg > * {
      stroke: var(--point-color);
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
