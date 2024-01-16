import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Button from '../common/Buttons/Button';
import PlusIcon from '../common/icons/PlusIcon';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

export default function SellerCenterTitleWrapper() {
  return (
    <SSellerCenterTitleWrapper>
      <h2>
        대시보드
        {' '}
        <strong>백엔드글로벌</strong>
      </h2>
      <Link to="/seller/post-product">
        <Button fontWeight="var(--font-weight-medium)">
          <PlusIcon />
          <span>상품 업로드</span>
        </Button>
      </Link>
    </SSellerCenterTitleWrapper>
  );
}

const SSellerCenterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 1rem 0 1rem 2.4375rem;
  }

  a {
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

  ${mediaQuery(BREAKPOINT_TABLET)} {
    a {
      width: 4rem;
      height: 2.4rem;

      button {
        /* padding: 1rem 0; */

        svg {
          left: 50%;
          transform: translate(-50%, -50%);
        }

        & > span {
          display: none;
        }
      }
    }
  }
`;
