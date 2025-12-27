import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Button = styled.button`
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.blue[400]};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;
