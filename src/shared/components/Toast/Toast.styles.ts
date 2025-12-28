import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  z-index: 1000;
  font-size: 16px;
  color: white;
`;

export const Message = styled.span`
  color: inherit;
  white-space: pre-line;
`;
