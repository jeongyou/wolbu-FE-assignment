import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-height: 100vh;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.semantic.textPrimary};
  margin-bottom: 8px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Success = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  background: ${theme.colors.gray[50]};
`;

export const Failed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  background: ${theme.colors.gray[50]};
`;

export const FailedReason = styled.span`
  font-size: 12px;
  color: ${theme.semantic.error};
`;

export const Message = styled.p`
  font-size: 14px;
  color: ${theme.semantic.textSecondary};
`;
