import styled from 'styled-components';

import { mediaQuery, BREAKPOINT_PC } from '../style/mediaQuery/MediaQueryType';

import PostNotice from './PostNotice';
import PostProductForm from './PostProductForm';

export default function PostEditProductSection() {
  return (
    <SPostProductSection>
      <PostNotice />
      <PostProductForm />
    </SPostProductSection>
  );
}

const SPostProductSection = styled.section`
  margin: 2.625rem auto;
  display: flex;
  gap: 5rem;

  & > :first-child {
    width: 20rem;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    flex-direction: column;
    box-sizing: border-box;
    gap: 2.5rem;

    & > :first-child {
      width: 100%;
    }
  }
`;
