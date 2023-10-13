import Header from '../components/common/Header/Header';
import SellerCenterMain from '../components/sellerCenter/SellerCenterMain';
import SellerCenterTitleWrapper from '../components/sellerCenter/SellerCenterTitleWrapper';
import styled from 'styled-components';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../components/style/mediaQuery/MediaQueryType';

export default function SellerCenter() {
  return (
    <>
      <Header />
      <SMainContainer>
        <SellerCenterTitleWrapper />
        <SellerCenterMain />
      </SMainContainer>
    </>
  );
}

const SMainContainer = styled.main`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.75rem 6.25rem;
  box-sizing: border-box;

  ${mediaQuery(BREAKPOINT_PC)} {
    padding: 2.75rem 3rem;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2.75rem 1rem;
  }
`;
