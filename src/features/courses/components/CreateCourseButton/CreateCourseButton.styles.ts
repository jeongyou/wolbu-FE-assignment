import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Button = styled.button`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.blue[300]};
  border-radius: 8px;
  background: ${theme.colors.blue[50]};
  color: ${theme.colors.blue[400]};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.blue[100]};
  }
`;
