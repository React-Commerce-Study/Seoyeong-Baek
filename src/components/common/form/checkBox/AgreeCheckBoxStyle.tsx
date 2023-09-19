import styled from 'styled-components';
import CheckBox from '../../../../assets/icon/check-box.svg';
import CheckBoxFill from '../../../../assets/icon/check-fill-box.svg';

export const AgreeCheckBoxStyle = styled.article`
  .check-box {
    input {
      display: none;
    }

    label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);

      &::before {
        content: '';
        background: url(${CheckBox}) no-repeat center center;
        width: 16px;
        height: 16px;
        transition: all 0.3s ease;
      }

      &.checked::before {
        content: '';
        background: url(${CheckBoxFill}) no-repeat center center;
        width: 16px;
        height: 16px;
      }
    }
  }
`;
