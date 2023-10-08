import SellerCenterSaleList from './SellerCenterSaleList';
import styled from 'styled-components';

export default function SellerCenterMain() {
  const categories = [`판매중인 상품(${3})`, '주문/배송', '문의/리뷰', '통계', '스토어 설정'];

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
        <SellerCenterSaleList />
      </section>
    </SSellerCenterSection>
  );
}

const SSellerCenterSection = styled.section`
  box-shadow: inset 0 0 10px blue;
  display: flex;
  gap: 1.875rem;
  margin-top: 2.625rem;

  .category-nav {
    box-shadow: inset 0 0 10px blue;
    width: 250px;

    li:not(:last-child) {
      margin-bottom: 0.625rem;
    }

    ul li button {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-md);
      padding: 15px 20px;
      width: 100%;
      text-align: start;
    }

    ul li button.active {
      color: #fff;
      background-color: var(--point-color);
      border-radius: 5px;
    }
  }

  .display-nav-info {
    box-shadow: inset 0 0 10px blue;
    width: 90rem;
    border-radius: 5px;
    border: 1px solid var(--middle-gray-color);
    background: #f2f2f2;
  }
`;
