import Header from '../components/common/Header/Header';
import PostProductSection from '../components/postProduct/PostProductSection';
import styled from 'styled-components';

export default function SellerCenter() {
  return (
    <>
      <Header />
      <SMainContainer>
        <h2>상품 등록</h2>
        <PostProductSection />
      </SMainContainer>
    </>
  );
}

const SMainContainer = styled.main`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.75rem 6.25rem;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px pink;

  h2 {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
  }
`;
