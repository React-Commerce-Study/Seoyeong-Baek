import styled from 'styled-components';

const SModalBackground = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.8px);
  }
`;

const SModalLayout = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22.5rem;
  padding: 2.5rem 4.5rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  box-sizing: border-box;

  p {
    font-size: 1rem;
    margin-bottom: 26px;
    line-height: normal;
    white-space: pre-line;

    strong {
      font-weight: 800;
      font-size: 1.2rem;
    }
  }

  .delete-btn {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    padding: 0;
    width: 1.38rem;
    height: 1.38rem;
  }
`;

const SButtonWrapper = styled.div`
  display: flex;
  gap: 10px;

  & > button {
    font-size: 1rem;
    flex-basis: 50%;
    font-weight: 500;
    padding: 10px 0;
  }
`;

export { SModalBackground, SModalLayout, SButtonWrapper };
