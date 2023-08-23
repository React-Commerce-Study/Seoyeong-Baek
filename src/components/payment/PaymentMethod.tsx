import styled from 'styled-components';

export default function PaymentMethod() {
  return (
    <SSectionLayout>
      <h3>결제수단</h3>
      <input type="radio" name="" id="" />
      <input type="radio" name="" id="" />
      <input type="radio" name="" id="" />
    </SSectionLayout>
  );
}

const SSectionLayout = styled.section`
  /* width: 47.5rem; */
  flex-basis: 47.5rem;

  box-shadow: inset 0 0 10px red;
`;
