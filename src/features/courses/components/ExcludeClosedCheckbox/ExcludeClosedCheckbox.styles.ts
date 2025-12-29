import styled from '@emotion/styled';
import { theme } from '@/shared/styles/theme';

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  user-select: none;
`;

export const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.semantic.textPrimary};
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
`;

export const Box = styled.span<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;

  border: 1px solid
    ${({ $checked }) =>
      $checked ? theme.colors.blue[400] : theme.colors.gray[300]};
  background: ${({ $checked }) =>
    $checked ? theme.colors.blue[400] : theme.colors.white};
`;
