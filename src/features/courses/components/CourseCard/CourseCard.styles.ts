import { theme } from '@/shared/styles/theme';
import styled from '@emotion/styled';

export const Container = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${theme.colors.gray[25]};
  border-radius: 16px;
  background: ${theme.colors.white};

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const CheckButton = styled.button<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 6px;

  border: 1px solid
    ${({ checked }) =>
      checked ? theme.colors.blue[400] : theme.colors.gray[100]};
  background: ${({ checked }) =>
    checked ? theme.colors.blue[400] : theme.colors.white};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  color: ${theme.colors.white};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CheckIcon = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;

  &[data-checked='true'] {
    background: ${theme.colors.blue[400]};
  }

  &[data-checked='false'] {
    background: transparent;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const Meta = styled.div`
  font-size: 14px;
  color: ${theme.colors.gray[250]};
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: ${theme.colors.blue[400]};

  &[data-disabled='true'] {
    color: ${theme.colors.gray[200]};
  }
`;
