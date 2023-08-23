import styled from 'styled-components';

export default function PaymentList() {
  return (
    <>
      <STitle>주문/결제하기</STitle>
      <SCategoryList>
        <li>상품정보</li>
        <li>할인</li>
        <li>수량</li>
        <li>상품금액</li>
      </SCategoryList>

      <SCartListContainer>
        <div>아이템컨테이너</div>
        <div>아이템컨테이너</div>
      </SCartListContainer>

      <STotalPrice>
        <p>
          총 주문금액<strong>0원</strong>
        </p>
      </STotalPrice>
    </>
  );
}

const STitle = styled.h2`
  margin: 54px 0 52px;
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
`;

const SCategoryList = styled.ul`
  display: flex;
  text-align: center;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;

  li {
    font-size: 18px;
    font-weight: 400;

    &:first-child {
      flex-basis: 40%;
    }

    &:nth-child(2) {
      flex-basis: 20%;
    }

    &:nth-child(3) {
      flex-basis: 20%;
    }

    &:last-child {
      flex-basis: 20%;
    }
  }
`;

const SCartListContainer = styled.section`
  margin: 16px 0 30px;
  display: flex;
  flex-direction: column;
`;

const STotalPrice = styled.div`
  box-shadow: inset 0 0 10px red;
  text-align: end;
  font-size: 18px;
  font-weight: 500;

  strong {
    margin: 10px;
    font-size: 24px;
    font-weight: 700;
    color: #eb5757;
  }
`;
