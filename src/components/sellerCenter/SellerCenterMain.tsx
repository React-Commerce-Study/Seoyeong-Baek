import SellerCenterSaleList from './SellerCenterSaleList';
import styled from 'styled-components';
import { useState } from 'react';
import { mediaQuery, BREAKPOINT_PC } from '../style/mediaQuery/MediaQueryType';

export default function SellerCenterMain() {
  const [saleCount, setSaleCount] = useState(0);
  const categories = [`판매중인 상품(${saleCount})`, '주문/배송', '문의/리뷰', '통계', '스토어 설정'];

  const handleClickNav = () => {
    console.log('click');
  };

  return (
    <SSellerCenterSection>
      <nav className="category-nav">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button onClick={handleClickNav}>{category}</button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="display-nav-info">
        <SellerCenterSaleList setSaleCount={setSaleCount} />
      </section>
    </SSellerCenterSection>
  );
}

const SSellerCenterSection = styled.section`
  display: flex;
  gap: 1.875rem;
  margin-top: 2.625rem;

  .category-nav {
    width: 15.625rem;

    li:not(:last-child) {
      margin-bottom: 0.625rem;
    }

    li button {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-md);
      padding: 0.9375rem 1.25rem;
      width: 100%;
      text-align: start;
    }

    li button.active {
      color: #fff;
      background-color: var(--point-color);
      border-radius: 5px;
    }
  }

  .display-nav-info {
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--middle-gray-color);
    background: #f2f2f2;
    box-sizing: border-box;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    flex-direction: column;

    .category-nav {
      width: 100%;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          flex-grow: 1;
          margin-bottom: 0;
          box-shadow: inset 0 0 10px red;

          button {
            text-align: center;
            padding: 0.9375rem 0.8rem;
          }

          &:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;
