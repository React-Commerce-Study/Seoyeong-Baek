import Header from '../components/common/Header/Header';
import SellerCenterMain from '../components/sellerCenter/SellerCenterMain';
import SellerCenterTitleWrapper from '../components/sellerCenter/SellerCenterTitleWrapper';
import styled from 'styled-components';

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
  box-shadow: inset 0 0 10px pink;
`;
