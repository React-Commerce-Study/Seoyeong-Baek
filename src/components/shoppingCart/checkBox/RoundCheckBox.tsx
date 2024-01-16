import styled from 'styled-components';

import CheckBoxFill from '../../../assets/icon/check-round-Fill.svg';
import CheckBox from '../../../assets/icon/check-round.svg';

interface RoundCheckBoxProps {
  className?: string;
  onClick?: () => void;
}

export default function RoundCheckBox({ ...props }: RoundCheckBoxProps) {
  return (
    <>
      <SRoundCheckBox htmlFor="checkBox" {...props} />
      <input type="checkbox" id="checkBox" />
    </>
  );
}

const SRoundCheckBox = styled.label`
  display: block;
  margin: 0 auto;
  background: url(${CheckBox}) no-repeat center / contain;
  width: 1.25rem;
  height: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &.checked {
    background: url(${CheckBoxFill}) no-repeat center / contain;
    width: 1.25rem;
    height: 1.25rem;
  }
`;
