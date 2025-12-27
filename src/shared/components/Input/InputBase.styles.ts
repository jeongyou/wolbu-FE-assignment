'use client';

import { theme } from '@/shared/styles/theme';
import styled from '@emotion/styled';

export const InputBase = styled.input`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${theme.semantic.border};
  font-size: 14px;
  color: ${theme.semantic.textPrimary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[400]};
  }
`;
