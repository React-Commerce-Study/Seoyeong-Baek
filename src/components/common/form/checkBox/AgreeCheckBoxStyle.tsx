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
      gap: 0.625rem;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);
      flex-wrap: nowrap;

      &::before {
        flex-shrink: 0;
        content: '';
        background: url(${CheckBox}) no-repeat center / contain;
        width: 1rem;
        height: 1rem;
        transition: all 0.3s ease;
      }

      &.checked::before {
        content: '';
        background: url(${CheckBoxFill}) no-repeat center / contain;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;
