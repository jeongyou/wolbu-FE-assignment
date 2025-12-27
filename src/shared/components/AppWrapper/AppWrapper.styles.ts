import { theme } from '@/shared/styles/theme';
import styled from '@emotion/styled';

export const MobileWrapper = styled.main`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px 16px;
  border-left: 1px solid ${theme.colors.gray[25]};
  border-right: 1px solid ${theme.colors.gray[25]};
`;
