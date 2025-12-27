import { theme } from '@/shared/styles/theme';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.semantic.textPrimary};
`;

export const Helper = styled.span`
  font-size: 12px;
  color: ${theme.semantic.textSecondary};
`;

export const Error = styled.span`
  font-size: 12px;
  color: ${theme.semantic.error};
`;
