import Header from '../components/common/Header/Header';
import PostEditProductSection from '../components/postProduct/PostEditProductSection';
import styled from 'styled-components';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../components/style/mediaQuery/MediaQueryType';

export default function SellerCenter() {
  return (
    <>
      <Header />
      <SMainContainer>
        <h2>상품 등록</h2>
        <PostEditProductSection />
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

  ${mediaQuery(BREAKPOINT_PC)} {
    padding: 2.75rem 3rem;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2.75rem 1rem;
  }
`;
