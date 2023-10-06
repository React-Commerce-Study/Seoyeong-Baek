import PostNotice from './PostNotice';
import PostProductForm from './PostProductForm';
import styled from 'styled-components';

export default function PostProductSection() {
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
`;
