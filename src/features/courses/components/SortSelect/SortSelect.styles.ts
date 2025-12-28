import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${theme.semantic.textSecondary};
  padding: 12px 0px;
`;

export const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[100]};
  background: ${theme.colors.white};
  font-size: 14px;
  color: ${theme.semantic.textPrimary};
`;
