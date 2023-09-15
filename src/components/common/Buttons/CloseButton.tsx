import DeleteIcon from '../../../assets/icon/icon-delete.svg';
import styled from 'styled-components';

interface CloseButtonProps {
  onClick?: () => void;
}
export default function CloseButton(props: CloseButtonProps) {
  return (
    <SCloseButton className="delete-btn" {...props}>
      <img src={DeleteIcon} alt="닫기 아이콘 이미지" />
    </SCloseButton>
  );
}

const SCloseButton = styled.button`
  position: absolute;
  top: 1.125rem;
  right: 1.125rem;
  padding: 0;
  width: 1.38rem;
  height: 1.38rem;
`;
