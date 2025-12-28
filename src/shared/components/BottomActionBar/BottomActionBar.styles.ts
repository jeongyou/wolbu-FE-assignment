import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Container = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 12px 16px;
  background: ${theme.colors.white};
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: ${theme.colors.blue[400]};
  color: ${theme.colors.white};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background: ${theme.colors.gray[200]};
    color: ${theme.semantic.textSecondary};
    cursor: not-allowed;
  }
`;
