import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Status = styled.div`
  padding: 12px;
  font-size: 13px;
  color: ${theme.semantic.textSecondary};
  text-align: center;
`;

export const StatusError = styled(Status)`
  color: ${theme.semantic.error};
`;

export const Sentinel = styled.div`
  height: 1px;
`;
