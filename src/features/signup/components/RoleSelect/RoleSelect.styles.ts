import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Container = styled.div`
  display: flex;
  gap: 12px;
`;

export const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${theme.semantic.textPrimary};
`;
